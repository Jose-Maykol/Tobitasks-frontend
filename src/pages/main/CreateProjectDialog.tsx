import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus } from 'lucide-react'

// TODO: Add form validation and connect to backend

function CreateProjectDialog (): JSX.Element {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-neutral-100 text-neutral-900 hover:bg-neutral-200 w-full'>
          <Plus size={20} className='mr-2'/>
          Crear proyecto
        </Button>
      </DialogTrigger>
      <DialogContent className='max-h-[450px]'>
        <DialogHeader>
          <DialogTitle>
            Crear proyecto
          </DialogTitle>
        </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='flex flex-col items-start gap-2'>
              <Label htmlFor='name' className='text-right'>
                Nombre
              </Label>
              <Input id='name' className='col-span-3' placeholder='Nombre del proyecto' />
            </div>
            <div className='flex flex-col items-start gap-2'>
              <Label htmlFor='username' className='text-right'>
                Descripción
              </Label>
              <Textarea
                id='username'
                className='max-h-[150px]'
                placeholder='Descripción del proyecto'
                maxLength={200}
              />
            </div>
          </div>
        <DialogFooter>
          <Button type='submit'>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateProjectDialog
