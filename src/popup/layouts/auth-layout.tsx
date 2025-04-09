// import { cn } from "~lib/utils"

// import style from './style.module.scss'

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:min-h-[calc(100vh)] lg:h-screen">
      <div className="relative h-full flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r dark:border-gray-800 lg:flex"></div>
        <div className="p-8">
          <div className="mx-auto flex flex-col justify-center space-y-6 sm:w-[300px] w-[300px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
