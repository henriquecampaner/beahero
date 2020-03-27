import connection from '../../database/connection';
import generateUniqueId from '../../utils/generateUniqueId';

class OngsController {
  async store(request, response) {
    const { name, email, whatsapp, city, country } = request.body;

    const id = generateUniqueId();

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
