import Link from "next/link";

const Home = async () => {
  return (
    <main className="home-container">
      <Link href={"/documents/1"}>
        <button>
          Documents
        </button>
      </Link>
    </main>
  )
}

export default Home;