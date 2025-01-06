import { useEffect, useState } from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import { addressData } from "./interfaces/dataInterface";
import { Box } from "./components/Box";
import Map from "./components/Map";
import { Loader } from "./components/Loader";

function App() {
  const [data, setData] = useState<addressData>();
  const [Ip, setIp] = useState(""); // IP predeterminada para el primer fetch
  const [loading, setLoading] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIp(event.target.value);
  };

  const apiUrl = "http://ipwho.is/";

  const getData = async (ipAddress: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}${ipAddress}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Previene la recarga de la página
    getData(Ip); // Llama a la función con la IP actual
    setIp(""); // Limpia el input
  };

  // Realiza el fetch inicial con la IP predeterminada
  useEffect(() => {
    getData("");
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <>
      <main className="h-dvh relative font-rubik w-full">
        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto min-h-[28vh] flex flex-col justify-start pt-8 items-center gap-6 bg-[url('../ip-address-tracker-master/images/pattern-bg-desktop.png')] bg-cover bg-center"
        >
          <article className="w-full text-center">
            <h1 className="text-white text-4xl font-medium text">
              IP Address Tracker
            </h1>
          </article>
          <article className="flex w-[95%] items-center justify-center">
            <label
              className="w-full max-w-[550px] flex items-center gap-2 bg-white py-3 px-5 rounded-l-xl"
              htmlFor="username"
            >
              <input
                value={Ip}
                className=" focus:outline-none w-full text-lg"
                type="text"
                placeholder="Search for any IP address or domain"
                onChange={handleChange}
              />
            </label>
            <button
              type="submit"
              className="bg-black hover:bg-gray-400 transition-all text-white font-bold p-5 rounded-r-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
                <path
                  fill="none"
                  stroke="#FFF"
                  stroke-width="3"
                  d="M2 1l6 6-6 6"
                />
              </svg>
            </button>
          </article>
        </form>

        <article className="z-50 -translate-y-20 absolute left-1/2 transform -translate-x-1/2 flex min-h-[16vh] w-[95%] max-w-[1200px] m-auto bg-white p-3 md:p-8 rounded-xl shadow-xl">
          {loading && <Loader />}
          {data?.success && !loading ? (
            <div className="flex-1 flex max-md:flex-col">
              <Box header={"IP ADDRESS"} data={data.ip} />
              <Box header={"LOCATION"} data={data.country} />
              <Box header={"TIMEZONE"} data={`UTC ${data.timezone.utc}`} />
              <Box header={"ISP"} data={data.connection.isp} />
            </div>
          ) : (
            !loading && (
              <h1 className="text-red-600 font-bold text-2xl">
                Please enter a valid IP Address
              </h1>
            )
          )}
        </article>

        {data?.success && (
          <Map latitude={data.latitude} longitude={data.longitude} />
        )}
      </main>
    </>
  );
}

export default App;
