import Link from "next/link";
import { useRouter } from "next/router";

const ErrorPage = ({ statusCode }) => {
  const router = useRouter();
  return (
    <>
      <section className="mt-5 max-w-2xl mx-auto px-4">
        <h1 className="block text-4xl sm:text-6xl font-bold mb-3">{`Error - ${
          statusCode ?? "404"
        } 😥😪`}</h1>
        <p>
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : "An error occurred on client"}
        </p>
        <div className="grid grid-flow-col py-6">          
          <Link href="/">
            <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
              Go to Home
            </a>
          </Link>
          <a
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer text-end"
            onClick={() => router.back()}
          >
            Go back
          </a>
        </div>
      </section>
    </>
  );
};

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
