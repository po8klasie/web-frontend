import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../../../components/primitives/Popover'
import { ChevronDown } from 'lucide-react'
import { useState, type FC, type PropsWithChildren } from 'react'
import { clsx } from 'clsx'

const triggerClassName = `
inline-flex items-center whitespace-nowrap 
rounded-md text-sm font-medium ring-offset-background
transition-colors focus-visible:outline-none 
focus-visible:ring-2 focus-visible:ring-ring 
focus-visible:ring-offset-2 disabled:pointer-events-none
disabled:opacity-50 border border-input bg-background 
hover:bg-[hsl(240_4.8%_95.9%)] hover:text-accent-foreground 
h-10 px-4 py-2 justify-between`
const activeTriggerClassName = `border-primary bg-primary/5`

const popoverContentClassName = `
data-[state=open]:animate-in data-[state=closed]:animate-out 
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 
data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 
data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
bg-white
`

interface InlineFilterWrapperProps {
    title: string
    badgeNum: number
}

const InlineFilterWrapper: FC<PropsWithChildren<InlineFilterWrapperProps>> = ({
    title,
    children,
    badgeNum,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const isActive = badgeNum && badgeNum > 0

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger
                className={clsx(
                    triggerClassName,
                    isActive && activeTriggerClassName
                )}
            >
                <span className="mr-3">
                    {title}
                    {isActive ? (
                        <span className="ml-2 border-primary bg-primary text-white border rounded text-primary px-1">
                            {badgeNum}
                        </span>
                    ) : null}
                </span>
                <ChevronDown
                    className={clsx(
                        'w-5 h-5 transition-transform',
                        isOpen ? 'transform rotate-180' : ''
                    )}
                />
            </PopoverTrigger>
            <PopoverContent className={popoverContentClassName}>
                {children}
            </PopoverContent>
        </Popover>
    )
}

export default InlineFilterWrapper
