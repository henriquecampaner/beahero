import crypto from 'crypto';
import connection from '../../database/connection';

class OngsController {
  async store(request, response) {
    const { name, email, whatsapp, city, country } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      country,
    });

    return response.json({ id });
  }

  async index(request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  }
}

export default new OngsController();
