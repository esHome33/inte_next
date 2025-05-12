import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import {Button} from '@heroui/button';
import Image from 'next/image';

const HelpComponent = () => {
    return (
      
        <Dropdown
            className='relative top-1 w-fit'
        >
            <DropdownTrigger>
                <Button variant="bordered">
                    <Image
                        className='block dark:hidden mt-2'
                        src={'/help_light.svg'} alt='help' width={40} height={30} />
                    <Image
                        className='hidden dark:block mt-2'
                        src={'/help_dark.svg'} alt='help' width={40} height={30} />

                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="aide utilisateur"
                className='bg-orange-900/95 text-white p-4 rounded-md shadow shadow-amber-800'
            >
                <DropdownItem key="step1">💎 chaque indice permet de cocher une case dans les grilles</DropdownItem>
                <DropdownItem key="step2">💡 cliquer sur un indice totalement exploité</DropdownItem>
                <DropdownItem key="step3">♾️ il n&apos;y a qu&apos;un seul éléments en relation avec un seul autre</DropdownItem>
                <DropdownItem key="step4">🎖️ les indices fournis permettent de trouver l&apos;unique solution</DropdownItem>
            </DropdownMenu>
        </Dropdown>
  )
  
}

export default HelpComponent