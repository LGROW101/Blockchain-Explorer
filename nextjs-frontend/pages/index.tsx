import { GetServerSideProps } from "next";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";

type TopCoin = {
  name: string;
  symbol: string;
  current_price: number;
  change_24h: number;
  status: string;
  image: string;
};

type TopCoins = TopCoin[];

type Props = {
  topCoins: TopCoins;
};

const Home = ({ topCoins }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Top Coins</title>
        <meta
          name="description"
          content="Explore cryptocurrency prices and top coins"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">
          Top 20 Coins Blockchain
        </h1>
        <div className="flex justify-center">
          <section className="bg-white rounded-lg shadow-md p-6 w-full">
            {topCoins && topCoins.length > 0 ? (
              <ul className="space-y-4">
                {topCoins.map((coin, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                      <span className="font-medium">
                        {coin.name}{" "}
                        <span className="text-gray-500">({coin.symbol})</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        ${coin.current_price.toFixed(2)}
                      </p>
                      <p
                        className={`text-xs ${
                          coin.change_24h >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {coin.change_24h >= 0 ? "▲" : "▼"}{" "}
                        {Math.abs(coin.change_24h).toFixed(2)}%
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-500 text-center">
                Failed to fetch top coins.
              </p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const apiUrl = process.env.API_URL || "http://localhost:3000";
  try {
    const topCoinsResponse = await axios.get(`${apiUrl}/api/coin/top`);

    const topCoins = topCoinsResponse.data;

    console.log("Top Coins:", topCoins);

    return {
      props: {
        topCoins: topCoins || [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        topCoins: [],
      },
    };
  }
};

export default Home;
