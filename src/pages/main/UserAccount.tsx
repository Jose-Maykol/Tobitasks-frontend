import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { LogOut, User } from 'lucide-react'

interface UserAccountProps {
  isOpen: boolean
}

function UserAccount (
  { isOpen }: UserAccountProps
): JSX.Element {
  return (
    <Popover>
      <PopoverTrigger>
        <div className='flex flex-row gap-2 justify-start items-start'>
          <Avatar>
            <AvatarImage src='https://i.pinimg.com/736x/dd/83/9d/dd839da0d02c8fb65ecf98e469025464.jpg' alt="Shad" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className={`truncate text-sm font-semibold w-36 text-left ${isOpen ? 'block' : 'hidden'}`}>
            <p className='truncate w-36'>
              Jose Maykol
            </p>
            <p className='text-xs text-neutral-400 truncate w-36'>
              myemail_2002@hotmail.com
            </p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent side='right' className='w-50 ml-2 mb-4 p-2'>
        <div className='flex flex-col items-start'>
          <Button className='bg-white text-black w-full justify-start hover:bg-neutral-200'>
            <User size={20} className='mr-2'/>
            Perfil
          </Button>
          <Button className='bg-white text-black w-full justify-start hover:bg-neutral-200'>
            <LogOut size={20} className='mr-2'/>
            Cerrar sesión
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default UserAccount
