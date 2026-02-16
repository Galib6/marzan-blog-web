import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Portfolio' })

export default function Portfolio() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            About MBI
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            MBI is the abbreviation for "Mostly Borrowed Ideas", which is my pseudonym on{' '}
            <a className="underline" href="https://twitter.com">
              Twitter
            </a>
            .
          </p>

          <h2 className="pt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Why "Mostly Borrowed Ideas?"
          </h2>
          <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
            As a generalist, I do not have a background in any particular sector. I enjoy navigating
            across industries, businesses, and countries to learn, understand, and connect the dots.
            In any case, most ideas and innovations are <em>incremental</em> in nature. Very few of
            us are smart enough to come up with truly original or groundbreaking ideas.
          </p>

          <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
            I have background of working in the sell-side (outside the US) and in a long-only
            buy-side (US) shop before starting MBI Deep Dives. I also did my MBA, CFA, and FRM....
            yes, people from South Asian background have this strange fascination with credentials
            and I humbly succumbed to that stereotype. Of course, the market does not care about
            anyone's credentials. I could add two more certificates and could still be a terrible
            investor.
          </p>

          <p className="pt-2 text-base font-semibold text-gray-900 dark:text-gray-100">
            What can you expect from MBI Deep Dives?
          </p>
          <p className="text-base leading-7 text-gray-700 dark:text-gray-300">
            You should expect one email everyday on companies I follow or/and content I find.
          </p>

          {/* Portfolio section retained below the About copy */}
        </div>
        {/* <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div> */}
      </div>
    </>
  )
}
