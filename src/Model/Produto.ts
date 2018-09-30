import { model, Schema } from 'mongoose';

const ProdutoSchema: Schema = new Schema({
    nome: {
        type: String,
        default: '',
        required: true,
    },
    slug: {
        type: String,
        default: '',
        required: true,
        unique: true,
        trim: true,
    },
});

export default model('Produto', ProdutoSchema);