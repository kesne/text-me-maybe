import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { User, useUpdateAccountMutation } from '../queries';

type Props = {
    me: User;
    editing: boolean;
    onEditingChange(newEditing: boolean): void;
};

export default function EditAccount({ me, editing, onEditingChange }: Props) {
    const [name, setName] = useState(me.name);
    const [email, setEmail] = useState(me.email);
    const [updateAccount, { data, loading }] = useUpdateAccountMutation({
        variables: {
            name,
            email
        }
    });

    useEffect(() => {
        if (data) {
            onEditingChange(false);
        }
    }, [data, onEditingChange]);

    function handleEdit() {
        if (editing) {
            updateAccount();
        } else {
            onEditingChange(true);
        }
    }

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    return (
        <div>
            <Box display="flex">
                <Box flex={1}>
                    <Typography variant="h5">Your Account</Typography>
                </Box>
                <Button
                    variant={editing ? 'contained' : 'outlined'}
                    color={editing ? 'primary' : 'default'}
                    onClick={handleEdit}
                    disabled={loading}
                >
                    {editing ? 'Save Changes' : 'Edit Account'}
                </Button>
            </Box>
            <Box marginTop={2}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Typography variant="subtitle2">Name</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        {editing ? (
                            <TextField label="Name" value={name} onChange={handleNameChange} />
                        ) : (
                            me.name
                        )}
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle2">Email</Typography>
                    </Grid>
                    <Grid item xs={10}>
                        {editing ? (
                            <TextField label="Email" value={email} onChange={handleEmailChange} />
                        ) : (
                            me.email
                        )}
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}
