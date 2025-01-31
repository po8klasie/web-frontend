import { useCustomizationCtx } from '../lib/customizations/customizationContext'
import type { FC } from 'react'

interface BrandProps {
    className?: string
}

const Brand: FC<BrandProps> = ({ className }) => {
    const customizationCtx = useCustomizationCtx()
    const projectName = customizationCtx
        ? customizationCtx.projectConfig.projectName
        : null
    return (
        <span className={['font-primary text-xl', className].join(' ')}>
            <span className="font-bold">
                po
                <span className="text-primary">8</span>
                klasie
            </span>
            &nbsp;
            {projectName && (
                <span
                    className={[
                        'font-primary uppercase text-lightGray font-normal',
                    ].join(' ')}
                >
                    {projectName}
                </span>
            )}
        </span>
    )
}

export default Brand
