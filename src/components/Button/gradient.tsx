import Button from '@mui/material/Button';

function GradientButton(props: any) {
    return (
        <Button
            {...props}
            variant="contained"
            // #72FFFF, #00D7FF, #00A3FF, #5800FF, #62069B
            sx={{
                backgroundImage: 'linear-gradient(45deg, #72FFFF 10%, #00D7FF 20%, #00A3FF 50%,#5800FF 100%)',
                color: 'white',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                '&:hover': {
                    backgroundImage: 'linear-gradient(45deg, #72FFFF 10%, #00D7FF 20%, #00A3FF 50%,#5800FF 100%)',
                },
            }}
        >
            {props.children}
        </Button>
    );
}

export default GradientButton;