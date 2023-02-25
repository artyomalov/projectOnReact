import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewUser } from '../../store/userSlice';

export default function CreateUserForm() {
  const [fname, setFname] = useState('');
  const [sname, setSname] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();
  const createNewUserHandler = (e) => {
    e.preventDefault();

    if (fname && sname && email) {
      const newUser = {
        id: Date.now(),
        email: email,
        first_name: fname,
        last_name: sname,
        avatar: image,
        added: added,
      };
      dispatch(createNewUser(newUser));
      setFname('');
      setSname('');
      setEmail('');
      setAdded(false);
    }
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Enter user's first_name"
        onChange={(e) => setFname(e.target.value)}
        value={fname}
      />
      <input
        type="text"
        placeholder="Enter user's second_name"
        onChange={(e) => setSname(e.target.value)}
        value={sname}
      />
      <input
        type="email"
        placeholder="Enter user's email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>
        <input
          type="checkbox"
          checked={added}
          onChange={() => {
            setAdded((prev) => !prev);
          }}
        />{' '}
        Added
      </label>
      <input
        type="file"
        name="image"
        onChange={(e) => setImage(e.target.value)}
      />
      <button
        onClick={(e) => {
          createNewUserHandler(e);
        }}
      >
        Add user!
      </button>
    </form>
  );
}
