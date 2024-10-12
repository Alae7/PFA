import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { SellProduct } from '../../../lib';


const AddProduct = ({ setShowDetails }) => {


    return (
        <>
            <div>
                <button onClick={() => setShowDetails('main')} className='text-cyan-700 mb-8'>
                    <ArrowBackIosNewIcon className='mb-2 h-3 w-3' /> <span className='font-bold text-2xl ml-1'>Back</span>
                </button>
            </div>
            <SellProduct />
        </>
    )
}

export default AddProduct