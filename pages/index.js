
import { useFsFlag, useFlagship, Flagship, HitType } from '@flagship.io/react-sdk'
import styles from '../styles/Home.module.css'

export default function Home() {

  const fs = useFlagship();

  //get flag 
  const myFlag = useFsFlag("my_flag_key", "default-value");

  const onSendHitClick = () => {
    fs.hit.send(
      {
        type: HitType.PAGE_VIEW,
        documentLocation: "abtastylab"
      },
    );
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Next Static site generation integration with Flagship [SSG]</h1>
        <p>flag key: my_flag_key</p>
        <p>flag value: {myFlag.getValue()}</p>
        <button
          style={{ width: 100, height: 50 }}
          onClick={() => {
            onSendHitClick();
          }}
        >
          Send hits
        </button>
      </main>
    </div>
  )
}

// This function runs only on the server side
export async function getStaticProps() {
  //Start the Flagship SDK
  const flagship = Flagship.start(process.env.NEXT_PUBLIC_ENV_ID, process.env.NEXT_PUBLIC_API_KEY, {
    fetchNow: false,
  });

  const initialVisitorData = {
    id: "my_visitor_id",
    context: {
      any: "value",
    },
  };

  // Create a new visitor
  const visitor = flagship.newVisitor({
    visitorId: initialVisitorData.id,
    context: initialVisitorData.context,
  });

  // //Fetch flags
  await visitor.fetchFlags();

  // Pass data to the page via props
  return {
    props: {
      initialFlagsData: visitor.getFlagsDataArray(),
      initialVisitorData,
    }
  }
}