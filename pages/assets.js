import Head from "next/head";
import DashboardShell from "@/components/DashboardShell";
import StatsGrid from "@/components/StatsGrid";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import moment from "moment";

function Assets(props) {
  const title = "Assets Under Management - Badger Boost Market Analytics";
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <DashboardShell title={title}>
        <div className="mx-6 md:mx-12 space-y-6">
          <div>
            <StatsGrid title={""}>
              <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  AUM on 5th Aug 2021 (Boost implementation), in USD
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {"$" + Math.round(617056247.2947896 / 1000000) + " million"}
                </dd>
              </div>
              <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Latest AUM ({props.aums.slice(-1)[0].date}), in USD
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {"$" +
                    Math.round(props.aums.slice(-1)[0].aum / 1000000) +
                    " million"}
                </dd>
              </div>
            </StatsGrid>
          </div>

          <div className="space-y-2">
            <h2 className="font-bold">
              Assets Under Management (AUM) in USD, across all chains
            </h2>
            <p>
              The implementation of boost powerup raised AUM. Notice previous,
              more powerful spikes in AUM: 11 May 2021 (introduction of Boost
              V1), as well as early Feb 2021.
            </p>
            <div className="mt-4 h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={props.aums}
                  margin={{
                    top: 15,
                    left: 40,
                    right: 30,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="aum"
                    stroke="#8884d8"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="font-bold">
              Assets Under Management (AUM) in USD, before & after boost-powerup
              implementation, across all chains
            </h2>
            <p>
              A closer look reveals an expected upward trend in the days
              surrounding the implementation of boost-powerup.
            </p>
            <div className="mt-4 h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={props.boostAums}
                  margin={{
                    top: 15,
                    left: 40,
                    right: 30,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="aum"
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

export default Assets;

export async function getServerSideProps(context) {
  const [aumData] = await Promise.all([
    fetch(`https://api.llama.fi/protocol/badger-dao`).then((r) => r.json()),
  ]);
  const aumEntries = aumData.tvl;
  const boostAumEntries = aumEntries.filter(
    (entry) => entry.date >= 1626652800 && entry.date <= 1629331200
  );

  const aums = [];
  for (let i in aumEntries) {
    aums.push({
      date: moment.unix(aumEntries[i].date).format("DD/MM/yy"),
      aum: aumEntries[i].totalLiquidityUSD,
    });
  }

  const boostAums = [];
  for (let i in boostAumEntries) {
    boostAums.push({
      date: moment.unix(boostAumEntries[i].date).format("DD/MM/yy"),
      aum: boostAumEntries[i].totalLiquidityUSD,
    });
  }
  return {
    props: {
      aums,
      boostAums,
    },
  };
}
