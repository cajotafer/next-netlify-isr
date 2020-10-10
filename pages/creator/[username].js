import { useRouter } from 'next/router'
import Link from 'next/link'
import CustomHead from '@components/CustomHead'

export function getStaticPaths() {
  return { paths: [], fallback: true }
}

export async function getStaticProps({ params }) {
  // maybe don't need this transformation
  let title = params.username.split('-').join(' ')

  return {
    props: { title },
    revalidate: false,
  }
}

export default function Article(props) {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <main>
        <p>Article loading...</p>
      </main>
    )
  }

  const { title } = props
  return (
    <>
      <CustomHead title={title} />
      <div>
        <Link href="/">
          <a>
            <img src="/trib.png" alt="Tribune logo" />
          </a>
        </Link>
        <div className="subhead">You have been pranked - {new Date().toLocaleDateString()}</div>
        <h2>{title} - NOT</h2>
        <br />
        <p>
          Wow, you were pranked so good. I bet you wanna get your friends now, too.{` `}
          <Link href="/">
            <a>Go ahead, do it.</a>
          </Link>
        </p>
      </div>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;900&display=swap');
        html,
        body {
          padding: 0;
          margin: 0;
          color: #2f2f2f;
          background-color: #f9f7f1;
          text-align: center;
          font-family: 'Playfair Display', serif;
        }
        img {
          max-height: 90px;
          max-width: 90%;
          margin: 20px 0;
        }
        .subhead {
          text-transform: uppercase;
          border: 2px solid #2f2f2f;
          border-right: none;
          border-left: none;
          padding: 12px 0 12px 0;
          margin-bottom: 20px;
          width: 100%;
        }
        .foot {
          margin: 100px 0;
        }
      `}</style>
    </>
  )
}