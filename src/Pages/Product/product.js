import * as React from 'react';
import { useState } from 'react';
import { Paper, Container, Grid, MenuItem, Button, Typography, TextField, FormControlLabel, Checkbox } from '@material-ui/core/';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { useStyles } from './styles'
import { useProduct } from '../../Hooks/Products/useProduct';
const Product = () => {
    const classes = useStyles();
    const { image, setImage,descricao, setDescricao, preco, setPreco, handleSubmint, allCategory, id_category, setId_category } = useProduct('new')
    
    return (
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <Paper className={classes.paper}>
                        <Paper className={classes.paper}>
                            <Grid>
                                <h3>Formulario de Produto</h3>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={9}>
                                    <TextField
                                        required
                                        id="descricao"
                                        name="descricao"
                                        label="Descricao"
                                        fullWidth
                                        autoComplete="given-name"
                                        value={descricao}
                                        onChange={e => setDescricao(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="preco"
                                        name="preco"
                                        label="Preço"
                                        fullWidth
                                        autoComplete="preco"
                                        value={preco}
                                        onChange={e => setPreco(e.target.value)}
                                    />
                                </Grid>


                                <Grid container alignItems='flex-end' direction='row' >
                                    <Grid item xs={12} sm={5}>
                                        <FormControl className={classes.formControl} fullWidth>
                                            <InputLabel id="category" >Categoria</InputLabel>
                                            <Select
                                                label="category"
                                                id="category"
                                                defaultValue=""
                                                value={`${id_category ? id_category : '1'}`}
                                                onChange={e => setId_category(e.target.value)}

                                            >
                                                {console.log(allCategory)}{
                                                allCategory.map((g, key) => (
                                                    <MenuItem id="category"
                                                        key={key}
                                                        value={g.id}>
                                                        {g.category}
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sm={12} className={classes.root}>
                                        {image ? <img src={URL.createObjectURL(image)} width={150} height={200} /> : ''}
                                        <Grid item sm={12} className={classes.root}>

                                            <input type='file' multiple
                                                name='image'
                                                accept="application/pdf,image/*,.txt,.log"
                                                onChange={(e) => { const f = e.target.files ? e.target.files[0] : undefined; setImage(f) }} />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={12} >
                                    <Button variant="contained"
                                        className={classes.botoes}>
                                        {/*onClick={() => history.push('/usuario')} startIcon={<ArrowBack />} */}
                                        Volta
                                    </Button>
                                    <Button variant="contained" color="primary"
                                        className={classes.botoes}
                                        onClick={() => handleSubmint()} >
                                        Salvar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
export default Product