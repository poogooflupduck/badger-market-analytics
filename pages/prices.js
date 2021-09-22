import Head from "next/head";
import DashboardShell from "@/components/DashboardShell";
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

function Prices(props) {
  const title = "Token Prices - Badger Boost Market Analytics";

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <DashboardShell title={title}>
        <div className="mx-6 md:mx-12 space-y-4">
          <div className="space-y-2">
            <h2 className="font-bold">
              Badger historical token price (in USD)
            </h2>
            <p>
              From 5th Aug 2021 (Boost-powerup's implementation), there was a
              sharp rise in Badger token price.
            </p>
            <div className="mt-4 h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={props.badgerHistorical}
                  margin={{
                    top: 15,
                    right: 30,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="DATE" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="PRICE"
                    stroke="#8884d8"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="font-bold">
              Badger token price (in USD) before & after boost-powerup
            </h2>
            <p>
              Rapidly fluctuating token price as boost-powerup is implemented on
              the 5th and 6th Aug 2021. Uniswap volume for Badger rises during
              this time and hits $8.4 million in volume on the 7th Aug 2021.
            </p>
            <div className="mt-4 h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={props.badgerBoost}
                  margin={{
                    top: 15,
                    right: 30,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="HOUR" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="PRICE"
                    stroke="#8884d8"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="font-bold">Digg historical token price (in USD)</h2>
            <p>
              Digg price increases with the implementation of boost-powerup, but
              requires closer examination (see next graph) to find any
              exceptional trends.
            </p>
            <div className="mt-4 h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={props.diggHistorical}
                  margin={{
                    top: 15,
                    right: 30,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="DATE" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="PRICE"
                    stroke="#8884d8"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="font-bold">
              Digg token price (blue) and wBTC token price (black), in USD,
              before & after boost-powerup
            </h2>
            <p>
              Using wBTC price as a comparison price, we can better examine the
              changes in Digg price as boost-powerup is implemented (5th Aug
              2021). Digg prices breaks from underneath wBTC price to over wBTC
              price from the 5th Aug until the 25th Aug. Boost-powerup likely
              increased demand for Digg. There are still small-scale price
              fluctuations that track those of bitcoin during this period.{" "}
              <br />
              <br />
              Slower or smaller rebases would keep Digg price floating above
              reference for longer, keeping AUM higher, and possibly driving
              more demand for Badger products.{" "}
            </p>
            <div className="mt-4 h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={props.diggBoost}
                  margin={{
                    top: 60,
                    right: 30,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="HOUR" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="PRICE"
                    name="DIGG"
                    stroke="#8884d8"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    data={props.wbtcBoost}
                    dataKey="PRICE"
                    name="wBTC"
                    stroke="#000000"
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

export default Prices;

export async function getServerSideProps(context) {
  const [
    badgerHistoricalData,
    badgerBoost,
    diggHistoricalData,
    diggBoost,
    wbtcBoost,
  ] = await Promise.all([
    fetch(
      `https://api.flipsidecrypto.com/api/v2/queries/0c1eabbf-9d15-49a0-ac35-37fcb376706d/data/latest`
    ).then((r) => r.json()),
    fetch(
      `https://api.flipsidecrypto.com/api/v2/queries/8f552bfb-e964-4935-b784-c32880104bc1/data/latest`
    ).then((r) => r.json()),
    fetch(
      `https://api.flipsidecrypto.com/api/v2/queries/1d4b8798-7b8c-4f15-ac94-f1200702f2ce/data/latest`
    ).then((r) => r.json()),
    fetch(
      `https://api.flipsidecrypto.com/api/v2/queries/a3f7b4fa-2a8f-4328-8098-eab3ed54a1f1/data/latest`
    ).then((r) => r.json()),
    fetch(
      `https://api.flipsidecrypto.com/api/v2/queries/239ab8fa-2267-44fe-bb25-0a32fa1873f9/data/latest`
    ).then((r) => r.json()),
  ]);

  const badgerHistorical = badgerHistoricalData.map((item) => {
    let formatDate = item.DATE.split("T")[0];
    return {
      ...item,
      DATE: formatDate,
    };
  });

  const diggHistorical = diggHistoricalData.map((item) => {
    let formatDate = item.DATE.split("T")[0];
    return {
      ...item,
      DATE: formatDate,
    };
  });

  return {
    props: {
      badgerHistorical,
      badgerBoost,
      diggHistorical,
      diggBoost,
      wbtcBoost,
    },
  };
}
