import { useSelector, useDispatch } from 'react-redux';

import { Section } from 'components/Section/Section';
import ContactForm from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';

import { addContact, deleteContact } from 'redux/contacts/contacts-slice';
import { setFilter } from 'redux/filter/filter-slice';

import { getFilter } from 'redux/filter/filter-selector';
import {
  getAllContacts,
  getFilteredContacts,
} from 'redux/contacts/contacts-selectors';

export const App = () => {
  const allContacts = useSelector(getAllContacts);
  const filteredContacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const dublicateName = allContacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
    return Boolean(dublicateName);
  };

  const handleAddContact = ({ name, number }) => {
    if (isDublicate(name)) {
      return alert(`${name} is already in contacts`);
    }

    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };
  const isContacts = Boolean(filteredContacts.length);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#010101',
      }}
    >
      <Section title="Phonebook">
        <ContactForm onSubmit={handleAddContact} />
      </Section>

      <Section title="Contacts">
        <Filter value={filter} handleChange={handleFilter} />
        {isContacts && (
          <ContactList
            removeContact={handleDeleteContact}
            contacts={filteredContacts}
          />
        )}
      </Section>
    </div>
  );
};
