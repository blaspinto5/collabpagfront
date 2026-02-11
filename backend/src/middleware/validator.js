/**
 * Middleware de validación
 * @module middleware/validator
 */

/**
 * Validar campos requeridos
 * @param {Array} fields - Lista de campos requeridos
 */
const validateRequired = (fields) => {
  return (req, res, next) => {
    const missing = fields.filter(field => !req.body[field]);
    
    if (missing.length > 0) {
      return res.status(400).json({
        error: 'Campos requeridos faltantes',
        missing
      });
    }
    
    next();
  };
};

/**
 * Validar ID numérico en params
 */
const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id) || id < 1) {
    return res.status(400).json({
      error: 'ID inválido'
    });
  }
  
  req.params.id = id;
  next();
};

/**
 * Sanitizar entrada de texto
 * @param {Array} fields - Campos a sanitizar
 */
const sanitizeText = (fields) => {
  return (req, res, next) => {
    fields.forEach(field => {
      if (req.body[field] && typeof req.body[field] === 'string') {
        req.body[field] = req.body[field].trim();
      }
    });
    next();
  };
};

module.exports = {
  validateRequired,
  validateId,
  sanitizeText
};
