

import { HomePageType } from '@/enums/homePageType';
import Home from '@/shared/components/Home/Home';
import styles from '@/shared/styles/Admin.module.sass'
interface IAllProposalProps {
    id: string
}

const AllProposal: React.FC<IAllProposalProps> = ({ id }) => {
    return (
        <div className={styles.main_content}>
            <div className={styles.title}>Все анкеты</div>
            <div className={styles.sub_navigation}>
                {/* <Search activeComponent={activeComponent} setActiveComponent={setActiveComponent} /> */}
            </div>
            {/* <Home type={HomePageType.AllModels}  forModerator={true}/> */}
        </div>
    );
};

export default AllProposal;