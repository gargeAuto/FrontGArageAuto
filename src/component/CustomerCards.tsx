import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, Typography,} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

// Composant intermédiaire : petites fiches client + bouton "Voir plus" pour afficher toutes les voitures
// Usage: <CustomerCards customers={customersArray} />
// customersArray = [{ id, firstName, lastName, email, cars: [{ id, model, plate }] }, ...]

export default function CustomerCards({customer}) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (!customer) return null;

    return (
        <>
            <Card sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <CardHeader
                    avatar={
                        <Avatar>
                            <PersonIcon/>
                        </Avatar>
                    }
                    title={`${customer.name} ${customer.surname}`}
                    subheader={customer.email}
                />

                <CardContent sx={{flexGrow: 1}}>
                    <Typography variant="subtitle2" gutterBottom>
                        Première voiture
                    </Typography>

                    {customer.cars && customer.cars.length > 0 ? (
                        <Stack spacing={0.5}>
                            <Typography variant="body1">{customer.cars[0].model}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                {customer.cars[0].plate}
                            </Typography>
                        </Stack>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            Aucune voiture enregistrée
                        </Typography>
                    )}
                </CardContent>

                <Divider/>

                <CardActions sx={{justifyContent: 'flex-end', p: 2}}>
                    <Button size="small" component="a" href={`/clients/${customer.id}`}>
                        Voir plus
                    </Button>
                </CardActions>
            </Card>


        </>
    );
}

CustomerCards.propTypes = {
    customer: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        cars: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                model: PropTypes.string,
                plate: PropTypes.string,
            })
        ),
    }),
};

export const demoCustomer = {
    id: 'c1',
    firstName: 'Alexandre',
    lastName: 'Dulon',
    email: 'alex@example.com',
    cars: [
        {id: 'v1', model: 'Clio 4', plate: 'AB-123-CD'},
        {id: 'v2', model: '208', plate: 'EF-456-GH'},
    ],
};

