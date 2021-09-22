import Head from "next/head";
import DashboardShell from "@/components/DashboardShell";
import { Bar } from "react-chartjs-2";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Home(props) {
  const title = "User Behavior - Boost Powerup Market Analytics";
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <div className="">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardShell title={title}>
        <div className="mx-6 md:mx-12 space-y-4">
          <div className="space-y-2">
            <h2 className="font-bold">
              {`Daily value of Badger transfers (in USD) before & after boost-powerup`}
            </h2>
            <p>
              This metric shows the most drastic anticipation and reaction to
              the implementation of boost-powerup. Transfers of Badger token
              spiked before and after the implementation of boost-powerup (see
              Aug 3rd and Aug 7th).
            </p>
            <div className="mt-6 h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={400}
                  data={props.transferValues}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 30,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="METRIC_DATE" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="TOTAL_AMOUNT"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-bold">
              {`Number normal and whale BADGER holders on days before & after boost-powerup implementation`}
            </h2>
            <p>
              {`More whales and non-whales started holding Badger as boost-powerup was
              introduced. Looking across the 6 days prior and 6 days after boost-powerup was introduced, these increases were relatively minor; around a 3.5% increase for whales, and <2% increase for non-whales. Individual graphs further down below.`}
            </p>
            <Bar data={props.holdersDist} options={options} />
          </div>

          <div>
            <h2 className="font-bold">
              {`Number of BADGER holders (BADGER balance < $100k USD) on days before & after boost-powerup implementation`}
            </h2>
            <p>{`Badger holders with BADGER balance < $100k USD increased relatively slowly over this period.`}</p>
            <div className="mt-4 h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={props.normalHolders}
                  margin={{
                    top: 15,
                    right: 30,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="DAY_INDEX" />
                  <YAxis type="number" domain={["dataMin", "dataMax"]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="COUNT(DISTINCT ADDRESS)"
                    stroke="#8884d8"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <h2 className="font-bold">
              {`Number of BADGER whale holders (BADGER balance > $100k USD) on days before & after boost-powerup implementation`}
            </h2>
            <p>{`The number of Badger whale holders grew at a higher % rate than the number of non-whales over this period.`}</p>
            <div className="mt-4 h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={props.whaleHolders}
                  margin={{
                    top: 15,
                    right: 30,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="DAY_INDEX" />
                  <YAxis type="number" domain={["dataMin", "dataMax"]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="COUNT(DISTINCT ADDRESS)"
                    stroke="#8884d8"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </DashboardShell>
    </div>
  );
}

function doughnutChartTemplate() {
  return {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };
}

export async function getServerSideProps(context) {
  const [holdersDist, normalHolders, whaleHolders, transferValues] =
    await Promise.all([
      fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/a5ff36ff-3ad1-4847-aa04-a82e26a148bb/data/latest`
      ).then((r) => r.json()),
      fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/2255628d-27ee-46a0-971c-7ac9d9169831/data/latest`
      ).then((r) => r.json()),
      fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/e957df94-a2c1-4dd1-b89e-fc84983c2067/data/latest`
      ).then((r) => r.json()),
      fetch(
        `https://api.flipsidecrypto.com/api/v2/queries/8aa166e2-431e-44e9-8197-09b9ac29d29f/data/latest`
      ).then((r) => r.json()),
    ]);

  const data = {
    labels: [...new Set(holdersDist.map((entry) => entry.DAY_INDEX))],
    datasets: [
      {
        label: "Normal",
        data: holdersDist
          .filter((entry) => {
            return entry.HOLDER == "Normal";
          })
          .map((entry) => entry["COUNT(DISTINCT ADDRESS)"]),
        backgroundColor: "rgb(54, 162, 235)",
      },
      {
        label: "Whales",
        data: holdersDist
          .filter((entry) => {
            return entry.HOLDER == "Whale";
          })
          .map((entry) => entry["COUNT(DISTINCT ADDRESS)"]),

        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  return {
    props: {
      holdersDist: data,
      normalHolders,
      whaleHolders,
      transferValues,
    }, // will be passed to the page component as props
  };
}
