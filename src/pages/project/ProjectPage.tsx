import { Kanban } from 'lucide-react'

function ProjectPage (): JSX.Element {
  const backgroundStyle = {
    background: `
    radial-gradient(50% 50% at 100% 0,#ffc4f7 0%  5% ,#474bff 6%  15%,#ffc4f7 16% 25%,#474bff 26% 35%,#ffc4f7 36% 45%,
     #474bff 46% 55%,#ffc4f7 56% 65%,#474bff 66% 75%,#ffc4f7 76% 85%,#474bff 86% 95%,
     #0000 96%),
    radial-gradient(50% 50% at 0 100%,#ffc4f7 0%  5% ,#474bff 6%  15%,#ffc4f7 16% 25%,#474bff 26% 35%,#ffc4f7 36% 45%,
     #474bff 46% 55%,#ffc4f7 56% 65%,#474bff 66% 75%,#ffc4f7 76% 85%,#474bff 86% 95%,
     #0000 96%),
    radial-gradient(50% 50%,#ffc4f7 0%  5% ,#474bff 6%  15%,#ffc4f7 16% 25%,#474bff 26% 35%,#ffc4f7 36% 45%,
     #474bff 46% 55%,#ffc4f7 56% 65%,#474bff 66% 75%,#ffc4f7 76% 85%,#474bff 86% 95%,
     #0000 96%),
    radial-gradient(50% 50%,#ffc4f7 0%  5% ,#474bff 6%  15%,#ffc4f7 16% 25%,#474bff 26% 35%,#ffc4f7 36% 45%,
     #474bff 46% 55%,#ffc4f7 56% 65%,#474bff 66% 75%,#ffc4f7 76% 85%,#474bff 86% 95%,
     #0000 96%) 32px 32px`,
    backgroundSize: '64px 64px',
    backgroundColor: '#a855f7'
  }

  return (
    <section className='flex flex-col w-full h-full'>
      <div className='flex flex-col justify-end w-full h-60 rounded-md p-4' style={backgroundStyle}>
        <div className='h-14 py-2 px-4 flex flex-row gap-4 items-center w-full bg-white justify-between rounded-md'>
          <h2 className=' rounded-sm gap-4 my-auto'>
            <Kanban color="#a855f7" strokeWidth={3} size={40} className='w-auto inline'/>
            <span className='text-2xl font-bold truncate max-w-[600px] align-middle'>
              Proyecto 1
            </span>
          </h2>
          <p className='text-neutral-400 font-semibold text-sm'>
            Creado <br /> <span className='font-medium text-neutral-800'>22 de Febrero, 2024</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default ProjectPage
