import { Typography } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';

const ExampleDatas = () => {
    return (
        <div className="flex flex-col border-2 border-orange-600 rounded-lg p-5">
            <Typography component="b" variant="h6">
                Usuario de ejemplo
            </Typography>
            <Typography className="flex flex-col gap-2" component="div" variant="body">
                <div>
                    <PersonIcon /> 11.111.111-1
                </div>
                <div>
                    <KeyIcon /> 123456
                </div>
            </Typography>
        </div>
    );
};

export default ExampleDatas;
