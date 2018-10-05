import { model, Schema } from 'mongoose';

const ProdutoSchema: Schema = new Schema({
    cod: {
        type: String,
        default: '',
        required: true,
        unique: true,
        trim: true
    }, 
    nome: {
        type: String,
        default: '',
        required: true
    },
    descricao: {
        type: String,
        default: ''
    }, 
    valor: {
        type: Number,
        default: 0
    }
});

export default model('Produto', ProdutoSchema);