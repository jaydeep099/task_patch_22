// app.js — UI glue. Some pieces intentionally off; coordinate with API and QA to pass tests.
(function(){
  const $ = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

  const form = $('#contact-form');
  const list = $('#list');
  const query = $('#query');
  const addBtn = $('#addBtn');
  const clearBtn = $('#clearBtn');

  // Render list items
  function render(items){
    list.innerHTML = '';
    items.forEach(c => {
      const li = document.createElement('li');
      const left = document.createElement('div');
      left.innerHTML = `<strong>${c.name}</strong><br><small>${c.email} • ${c.phone || ''}</small>`;
      const right = document.createElement('div');
      const del = document.createElement('button');
      del.textContent = 'Remove';
      del.addEventListener('click', () => {
        // remove by email (per contract)
        api.removeContact(c.email);
        refresh();
      });
      right.appendChild(del);
      li.append(left, right);
      list.appendChild(li);
    });
  }

  function refresh(){
    const items = api.getContacts();
    render(items);
  }

  // Initial render
  refresh();

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const phone = $('#phone').value.trim();
    // Intentional: rely on API for validation; UI only collects fields
    const res = api.addContact({ name, email, phone });
    if(!res || !res.ok){
      alert(res && res.error ? res.error : 'Failed to add contact.');
      return;
    }
    form.reset();
    refresh();
  });

  clearBtn.addEventListener('click', () => {
    // clear by removing each contact
    const items = api.getContacts();
    items.forEach(x => api.removeContact(x.email));
    refresh();
  });

  // Live search
  query.addEventListener('input', () => {
    const q = query.value;
    const items = q ? api.searchContacts(q) : api.getContacts();
    render(items);
  });

  // Expose for manual debugging if needed
  window.UI = { render, refresh };
})();
