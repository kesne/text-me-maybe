import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

type Props = {
    header: string;
    description: string;
    Icon: React.FunctionComponent<SvgIconProps>;
};

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    },
    avatar: {
        width: 60,
        height: 60,
        backgroundColor: theme.palette.secondary.main
    },
    gridItem: {
        borderRight: `1px solid ${theme.palette.grey[300]}`,
        '&:last-child': {
            borderRight: 'none'
        }
    }
}));

export default function ValueProp({ header, description, Icon }: Props) {
    const classes = useStyles();

    return (
        <Grid item xs={4} className={classes.gridItem}>
            <div className={classes.container}>
                <Avatar className={classes.avatar}>
                    <Icon fontSize="large" />
                </Avatar>
                <Typography variant="h6">{header}</Typography>
                <Typography>{description}</Typography>
            </div>
        </Grid>
    );
}
