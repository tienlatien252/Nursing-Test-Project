import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
}));

export default useStyles;