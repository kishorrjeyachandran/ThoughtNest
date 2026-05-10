import Layout from "../components/Layout";

function Articles() {
  return (
    <Layout title="Articles">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold tracking-tight">
          Articles
        </h1>

        <p className="text-[#9B9B9B] text-lg mt-6 leading-8">
          Explore all published articles on ThoughtNest.
        </p>

      </div>

    </Layout>
  );
}

export default Articles;