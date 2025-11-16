import { genPageMetadata } from 'app/seo'
import SectionContainer from '@/components/SectionContainer'
import Image from 'next/image'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  return (
    <SectionContainer>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <Image
              src="/static/images/avatar.png"
              alt="avatar"
              width={192}
              height={192}
              className="h-48 w-48 rounded-full"
            />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">
              Tails Azimuth
            </h3>
            <div className="text-gray-500 dark:text-gray-400">Developer</div>
            <div className="text-gray-500 dark:text-gray-400">Company</div>
          </div>
          <div className="prose max-w-none pt-8 pb-8 dark:prose-invert xl:col-span-2">
            <p>
              Welcome to my blog! I'm a developer passionate about building modern web applications
              with Next.js, React, and TypeScript.
            </p>
            <p>
              This blog is powered by Editor.js, which allows for flexible content management and
              easy API integration. All posts are stored as JSON, making it simple to fetch from
              any backend or CMS.
            </p>
            <h2>What I Write About</h2>
            <ul>
              <li>Web Development</li>
              <li>JavaScript & TypeScript</li>
              <li>React & Next.js</li>
              <li>Software Architecture</li>
              <li>Best Practices</li>
            </ul>
            <p>
              Feel free to explore the blog and reach out if you have any questions or want to
              connect!
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
