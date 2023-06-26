const Photo = require('../models/photo');
const User = require('../models/user');


// principio de responsabilidad unica
//200, exitosos 
//400 error de usuario
//500 error del servidor 
// Crear una foto
const createPhoto = async (req, res) => {
  try {
    const { email, url } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const photo = new Photo({ user: user._id, url });
    const savedPhoto = await photo.save();

    user.imagenes.push(photo._id);
    await user.save();

    return res.json(savedPhoto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener detalles de una foto
const getPhoto = async (req, res) => {
  try {
    const { id, email } = req.params;

    // Verificar si el email está presente
    if (!email) {
      return res.status(400).json({ message: 'el Email es requerdio' });
    }
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si la foto existe y pertenece al usuario
    const photo = await Photo.findOne({ _id: id, user: user._id });
    console.log(photo.id);
    if (!photo) {
      return res.json({ message: 'Foto no encontrada' });
    }

    // Obtiene los detalles de la foto
    const detallesFoto = {
      id: photo._id,
      email: email,
      url: photo.url,
    };

    res.json(detallesFoto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Obtener detalles de una foto
const getAllPhoto = async (req, res) => {
  try {
    const { email } = req.params;

    // Verificar si el email está presente
    if (!email) {
      return res.json({ message: 'El email es requerido' });
    }

    // Verificar si el usuario existe
    
    const user = await User.findOne({ email }).catch(e=>console.log(e.message));

    if (!user) {
      return res.json({ message: 'Usuario no encontrado' });
    }

    // Verificar si la foto existe y pertenece al usuario
    const photo = await Photo.find({ user: user._id });

    if (!photo) {
      return res.json({ message: 'Fotos no encontradas' });
    }

    // Obtiene los detalles de la foto
    const detallesFotos = photo.map(photo => ({
      id: photo._id,
      email: email,
      url: photo.url,
    }));
    return res.json(detallesFotos);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una foto
const updatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, url } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const existingPhoto = await Photo.findById(id);
    if (!existingPhoto) {
      return res.status(404).json({ message: 'Foto no encontrada' });
    }

    // Verificar si el usuario tiene la imagen relacionada
    const hasPhoto = user.imagenes.includes(id);
    if (!hasPhoto) {
      return res.status(403).json({ message: 'No tienes permiso para actualizar esta foto' });
    }

    // Verificar si el ID de la foto existe
  
    const updatedPhoto = await Photo.findByIdAndUpdate(
      id,
      { url },
      { new: true }
    );

    return res.json(updatedPhoto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// elimina una foto 
const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si el ID de la foto existe
    const existingPhoto = await Photo.findById(id);
    if (!existingPhoto) {
      return res.status(404).json({ message: 'Foto no encontrada' });
    }
    

    // Verificar si el usuario tiene la imagen relacionada
    const hasPhoto = user.imagenes.includes(id);
    if (!hasPhoto) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta foto' });
    }

    const deletedPhoto = await Photo.findByIdAndDelete(id);

    // Eliminar referencia de la foto en el usuario
    await User.updateOne({ imagenes: id }, { $pull: { imagenes: id } });

    return res.json({ message: 'Foto eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = { createPhoto, getPhoto,getAllPhoto, updatePhoto, deletePhoto };
