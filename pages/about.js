import Head from "next/head";
import DashboardShell from "@/components/DashboardShell";

function About(props) {
  const title = "About - Badger Boost Market Analytics";
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <DashboardShell title={title}>
        <div className="mx-6 md:mx-12 space-y-6">
          <div className="space-y-2">
            <p>This dashboard was produced by @karlxlee for Badger DAO.</p>
            <h2 className="font-bold">Data sources</h2>
            <p>
              Data was primarily sourced from Flipside Crypto. AUM stats were
              sourced from DeFi Llama (the same AUM data source used by
              CoinMarketCap).
            </p>
            <h2 className="font-bold">Visualizations</h2>
            <p>Rechart and chartjs were used to produce visualizations.</p>
          </div>
        </div>
      </DashboardShell>
    </div>
  );
}

export default About;
