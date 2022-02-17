import createConnection from '../index';
import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';

async function create() {
  const connection = await createConnection('localhost');

  const id = uuidV4();
  const password = await hash('admin', 8);

  await connection.query(`
  INSERT INTO users (id, name, email, password, "isAdmin", driver_license, created_at)
  VALUES (
    '${id}',
    'admin',
    'admin@rentx.com.br',
    '${password}',
    true,
    '0123456789',
    NOW()
  )
`);
  await connection.close;
}

create().then(() => console.log('User created !'));
