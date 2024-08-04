'use client'

import { IDistrict } from "@/types/core/district";
import { IUnderground } from "@/types/core/underground";
import { useEffect, useState } from "react";
import styles from '@/shared/styles/Editor.module.sass'
import { addDistrict, deleteDistrict, updateDistrict } from "@/lib/district/districkAction";
import { addUnderground, deleteUnderground, updateUnderground } from "@/lib/underground/undergroundAction";
import { Save } from "@/shared/assets/Save";
import { Delete } from "@/shared/assets/Delete";
import ConfirmMessageModal from "@/shared/components/Modals/ConfirmMessageModal";


interface IEditingDistricts {
    districts: IDistrict[]
    undergrounds: IUnderground[]
}

const EditingDistricts: React.FC<IEditingDistricts> = ({ districts, undergrounds }) => {
    const [editedDistricts, setEditedDistricts] = useState([] as any[]);
    const [newDistrict, setNewDistrict] = useState({ district: '', district_eng: '' });
    const [editedUndergrounds, setEditedUndergrounds] = useState([] as any[]);
    const [newUnderground, setNewUnderground] = useState({ underground: '', underground_eng: '' });
    const [isConfirmDistrictModalShow, setIsConfirmDistrictModalShow] = useState(false as any);
    const [isConfirmUndergroundModalShow, setIsConfirmUndergroundModalShow] = useState(false as any);


    const handleDistrictChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let editedDistrictsCopy = JSON.parse(JSON.stringify(editedDistricts));
        editedDistrictsCopy[index][name] = value;
        editedDistrictsCopy[index]['edited'] = true;
        setEditedDistricts(editedDistrictsCopy);
    };

    const handleNewDistrictChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const tempDistrict = { ...newDistrict };
        (tempDistrict as any)[name] = value;
        setNewDistrict(tempDistrict);
    };

    const handleSaveChangedDistrict = async (index: number) => {
        let editedDistrictsCopy = JSON.parse(JSON.stringify(editedDistricts));
        editedDistrictsCopy[index]['edited'] = false;
        await updateDistrict(editedDistrictsCopy[index]);

    };

    const handleAddDistrict = async () => {
        await addDistrict(newDistrict);
        setNewDistrict({ district: '', district_eng: '' });
    };

    const handleUndergroundChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let editedUndergroundsCopy = JSON.parse(JSON.stringify(editedUndergrounds));
        editedUndergroundsCopy[index][name] = value;
        editedUndergroundsCopy[index]['edited'] = true;
        setEditedUndergrounds(editedUndergroundsCopy);
    };

    const handleNewUndergroundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const tempUnderground = { ...newUnderground };
        (tempUnderground as any)[name] = value;
        setNewUnderground(tempUnderground);
    };

    const handleSaveChangedUnderground = async (index: number) => {
        let editedUndergroundsCopy = JSON.parse(JSON.stringify(editedUndergrounds));
        editedUndergroundsCopy[index]['edited'] = false;
        await updateUnderground(editedUndergroundsCopy[index]);

    };

    const handleAddUnderground = async () => {
        await addUnderground(newUnderground);

        setNewUnderground({ underground: '', underground_eng: '' });
    };

    useEffect(() => {
        setEditedDistricts([...districts].sort((a, b) => a.district.localeCompare(b.district)))
    }, [districts]);

    useEffect(() => {
        setEditedUndergrounds([...undergrounds].sort((a, b) => a.underground.localeCompare(b.underground)))
    }, [undergrounds]);

    const handleConfirmDeleteDistrict = async () => {
        await deleteDistrict({ id: isConfirmDistrictModalShow });
        setIsConfirmDistrictModalShow(false);
    };

    const handleConfirmDeleteUnderground = async () => {
        await deleteUnderground({ id: isConfirmUndergroundModalShow });
        setIsConfirmUndergroundModalShow(false);
    };


    return (
        <div className={styles.main_content}>
            <div className={styles.title}>Редактирование районов</div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>District</th>
                            <th>District Eng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {editedDistricts.map((district, index) => (
                            <tr key={index}>
                                <td><input type="text" name="district" value={district.district} onChange={e => handleDistrictChange(index, e)} /></td>
                                <td><input type="text" name="district_eng" value={district.district_eng} onChange={e => handleDistrictChange(index, e)} /></td>
                                <td className={styles.buttons}>
                                    <button disabled={!district.edited} type="button" onClick={() => handleSaveChangedDistrict(index)}>
                                        <Save />
                                    </button>
                                    <button className={styles.delete_button} type="button" onClick={() => setIsConfirmDistrictModalShow(district.id)}>
                                        <Delete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td><input type="text" name="district" value={newDistrict.district} onChange={e => handleNewDistrictChange(e)} /></td>
                            <td><input type="text" name="district_eng" value={newDistrict.district_eng} onChange={e => handleNewDistrictChange(e)} /></td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleAddDistrict}>Сохранить новый район</button>
            </div>
            <div className={styles.title}>Редактирование станций метро</div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Underground</th>
                            <th>Underground Eng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {editedUndergrounds.map((underground, index) => (
                            <tr key={index}>
                                <td><input type="text" name="underground" value={underground.underground} onChange={e => handleUndergroundChange(index, e)} /></td>
                                <td><input type="text" name="underground_eng" value={underground.underground_eng} onChange={e => handleUndergroundChange(index, e)} /></td>
                                <td className={styles.buttons}>
                                    <button disabled={!underground.edited} type="button" onClick={() => handleSaveChangedUnderground(index)}>
                                        <Save />
                                    </button>
                                    <button className={styles.delete_button} type="button" onClick={() => setIsConfirmUndergroundModalShow(underground.id)}>
                                        <Delete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td><input type="text" name="underground" value={newUnderground.underground} onChange={e => handleNewUndergroundChange(e)} /></td>
                            <td><input type="text" name="underground_eng" value={newUnderground.underground_eng} onChange={e => handleNewUndergroundChange(e)} /></td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handleAddUnderground}>Сохранить новую станцию</button>
            </div>
            <ConfirmMessageModal
                text={'Вы действительно хотите удалить район?'}
                okButtonText={'Удалить'}
                handlerOkOnClick={handleConfirmDeleteDistrict}
                cancelButtonText={'Отменить'}
                isShow={!!isConfirmDistrictModalShow}
                setIsShow={setIsConfirmDistrictModalShow}
            />
            <ConfirmMessageModal
                text={'Вы действительно хотите удалить станцию метро?'}
                okButtonText={'Удалить'}
                handlerOkOnClick={handleConfirmDeleteUnderground}
                cancelButtonText={'Отменить'}
                isShow={!!isConfirmUndergroundModalShow}
                setIsShow={setIsConfirmUndergroundModalShow}
            />
        </div>
    );
};

export default EditingDistricts;