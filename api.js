// api.js — data layer (initially imperfect). Your team must reconcile API <-> UI <-> Tests.
(function () {
  const STORAGE_KEY = "contact_v1"; // BUG: tests expect 'contacts_v1'
  let contacts = [];

  function _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      contacts = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(contacts)) contacts = [];
    } catch (e) {
      contacts = [];
    }
  }
  function _save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }
  _load();

  // Expected by tests (see tests.js): addContact({name,email,phone}) -> {ok:boolean, error?:string}
  function addContact(obj) {
    // BUGS: no validation, no duplicate check, no normalization, no phone rules

    if (!obj.name) {
      const div = document.createElement("div");
      div.innerHTML = "Name cannot be empty";
      document.body.appendChild(div);
      return;
    } else if (obj.name.length <= 2) {
      const div = document.createElement("div");
      div.innerHTML = "Name cannot be less than 2 Characters";
      document.body.appendChild(div);
      return;
    }
   
    
    let pattern = /^[a-z0-9]+@[a-z]+\.[a-z]+$/;
    let emailFound = contacts.find((c) => c.email === obj.email);
    if (!obj.email) {
      const div = document.createElement("div");
      div.innerHTML = "email cannot be empty";
      document.body.appendChild(div);
      return;
    } 
     if (!pattern.test(obj.email)) {
      const div = document.createElement("div");
      div.innerHTML = "Invalid email";
      document.body.appendChild(div);
      return;
    } else if (emailFound) {
      const div = document.createElement("div");
      div.innerHTML =
        "Try with different email. This email has been already used";
      document.body.appendChild(div);
      return;
    }
    let phonePattern = /^{0-9}/;
    if (!obj.phone) {
      const div = document.createElement("div");
      div.innerHTML = "Phone cannot be empty";
      document.body.appendChild(div);
      return;
    } else if (obj.phone.length < 10 && obj.phone.length > 13) {
      const div = document.createElement("div");
      div.innerHTML = "Phone lenght should be 10 or 13";
      document.body.appendChild(div);
      return;
    } else if (phonePattern.test(obj.phone)) {
      const div = document.createElement("div");
      div.innerHTML = "Phone should be numbers";
      document.body.appendChild(div);
      return;
    }
    contacts.push({ name: obj.name, email: obj.email, phone: obj.phone });

    _save();
    return { ok: true };
  }

  // Expected: getContacts() returns sorted by name ASC
  function getContacts() {
    // BUG: unsorted copy
    return contacts.sort((a, b) => a - b);
  }

  // Expected: case-insensitive match by name/email
  function searchContacts(q) {
    // BUG: case-sensitive and only by name
    return contacts.filter((c) => (c.name.toLowerCase()).includes(q.toLowerCase()) || c.email.toLowerCase()).includes(q.toLowerCase());
  }

  // Expected: remove by email
  function removeContact(email) {
    // BUG: removes by name mistakenly
    const before = contacts.length;
    const userToBeDeleted = contacts.findIndex((c) => c.email === email);
    if (!userToBeDeleted) {
      const div = document.createElement("div");
      div.innerHTML = "Phone should be numbers";
      document.body.appendChild(div);
    }
    contacts.splice(userToBeDeleted, 1);
    _save();
    return contacts.length !== before;
  }

  // Helper for tests to simulate reload
  function _resetApi() {
    contacts = [];
    _save();
    _load();
  }

  window.api = {
    addContact,
    getContacts,
    searchContacts,
    removeContact,
    _resetApi,
    _load,
    _save,
  };
})();
