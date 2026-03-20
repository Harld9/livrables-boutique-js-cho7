const data = require('../../data.json')

exports.getChaussetteById = async (req,res) =>{
    const id = req.params.id;
    const chaussettes = data.sneakers;
    const chaussette = chaussettes.find(chaussette => chaussette.id === parseInt(id));
    if (!chaussette) {
        res.status(404).json({
            code : 404,
            message : 'Chaussette not found'
        })
    }else{
         res.status(200.).json({
        message: 'Chaussette trouvé Ok',
        sneaker: chaussette
        })
    }
    }

exports.getChaussettes = (req,res) => {
    const chaussettes = data.sneakers;
    res.status(200.).json({
        message: 'Sneakers Trouvé Ok',
        sneakers: chaussettes
    })
}