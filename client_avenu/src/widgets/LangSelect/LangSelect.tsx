'use client';


import { GreatBritanFlag } from '@/shared/assets/GreatBritanFlag';
import { RussianFlag } from '@/shared/assets/RussianFlag';
import { usePathName } from '@/shared/hooks/usePathName';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import Select, { components } from 'react-select'

import styles from './LangSelector.module.sass'


// const DropdownIndicator = (props: any) => {
//     return (
//         <components.DropdownIndicator {...props}>

//             <Image alt="arrow"
//                 width={20}
//                 height={20}
//                 src={'../../shared/assets/flags/saudi_arabia.svg'}
//                 className={`${props.selectProps.menuIsOpen ? 'arrowDown' : 'arrowUp'}`}
//             />
//         </components.DropdownIndicator>
//     );
// };


const MenuList = (props: any) => {
    return (
        <components.MenuList {...props}>
            <div className={styles.menuList}>
                <p className={styles.title}>Выберите язык</p>
                {props.children}
            </div>
        </components.MenuList>
    );
}

const IndicatorSeparator = () => {
    return <></>;
}; // removes the "stick"





const formatOptionLabel = (item: any, isHaveIcon: boolean) => {
    return isHaveIcon ? (
        <div className={styles.optionWithImg}>
            {item.icon}
            <p>{item.label}</p>
        </div>
    ) : (
        item.label
    );
};


const LangSelect = () => {
    const path = usePathName();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const locale = useLocale();
    const width = '100%';
    const options = [
        { value: 'ru', label: 'RU', icon: <RussianFlag /> },
        { value: 'en', label: 'EN', icon: <GreatBritanFlag /> },
    ]


    const onSelectChange = (e: any) => {
        console.log('e.target.value', e.value)
        const nextLocale = e.value;
        startTransition(() => {
            router.replace(`/${nextLocale}${path === '/' ? '' : `/${path}`}`);
        });
    };
    const customStyles = {
        container: (defaultStyles: any, state: any) => ({
            ...defaultStyles,
            width: width,
            height: '47px',
            maxWidth: '200px',
            cursor: 'pointer',
            borderRadius: '5px',
            border: '0.5px solid #FFFFFF'
        }),
        option: (defaultStyles: any, state: any) => ({
            ...defaultStyles,
            top: 0,
            color: state.isFocused ? 'ffffff' : '#E1E2E7',
            backgroundColor: state.isFocused ? '#E1E2E7' : '#FFFFFF',
            fontSize: '14px',
            cursor: 'pointer',
            borderRadius: '5px',
        }),
        valueContainer: (defaultStyles: any, state: any) => ({
            ...defaultStyles,
            // padding: 8,
            display: 'flex',
            alignItems: 'center',
        }),
        indicators: (defaultStyles: any, state: any) => ({
            ...defaultStyles,
            padding: 8,
            cursor: 'pointer',
        }),
        control: (defaultStyles: any) => ({
            ...defaultStyles,
            backgroundColor: 'transparent',
            height: 40,
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            border: 'none',
            boxShadow: 'none',
            // borderRadius: '12px',
            cursor: 'pointer',
        }),
        menu: (defaultStyles: any) => ({
            ...defaultStyles,
            top: 80,
            right: 0,
            width: 180,
            dispay: 'flex',
            // backgroundColor: '#3A2964',
            // boxSizing: 'min-content',
            // borderRadius: "12px",
            // "&>div": {
            //     borderRadius: "12px",
            // },
        }),
        menuList: (defaultStyles: any) => ({
            ...defaultStyles,
            padding: 0,
            backgroundColor: '#FFFFFF',
            borderRadius: '5px',
            boxShadow: '0 1px 8px #00000040',
        }),
        dropdownIndicator: (provided: any, state: any) => ({
            ...provided,
            // padding: 0,
            padding: 8,
            cursor: 'pointer',
            transition: 'all .2s ease',
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
            left: state.selectProps.menuIsOpen ? '8px' : null

        }),
        ropdownIndicator: (provided: any, state: any) => ({
            ...provided,
            transition: 'all .2s ease',
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
            // background: `url('../../../img/customSelect/arrow-down.png') no-repeat right #8774B8 `,
        }),
    }

    return (
        <div>

            <Select
                defaultValue={options.find(item => item.value === locale)}
                components={{ IndicatorSeparator, MenuList }}
                instanceId="lang-select"
                options={options}
                onChange={onSelectChange}
                isSearchable={false}
                formatOptionLabel={item => formatOptionLabel(item, true)}
                menuPlacement={'top'}
                styles={customStyles}
            // menuIsOpen

            />
        </div>
    );
};

export default LangSelect;