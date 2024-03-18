// Definicja adresu URL endpointu
const API_ENDPOINT = '/api/data';
const CACHE_NAME = 'my-app-cache-v1';

const data = [
  {
      id: 1,
      name: 'Janusz',
      lastname: 'Kowalski',
      phone: '501474375',
      email: 'janusz.kowalski@gmail.com'
  },
  {
      id: 2,
      name: 'Marta',
      lastname: 'Nowak',
      phone: '512345678',
      email: 'marta.nowak@yahoo.com'
  },
  {
      id: 3,
      name: 'Adam',
      lastname: 'Wiśniewski',
      phone: '503987654',
      email: 'adam.wisniewski@hotmail.com'
  },
  {
      id: 4,
      name: 'Anna',
      lastname: 'Wójcik',
      phone: '509876543',
      email: 'anna.wojcik@outlook.com'
  },
  {
      id: 5,
      name: 'Krzysztof',
      lastname: 'Kowalczyk',
      phone: '504321987',
      email: 'krzysztof.kowalczyk@example.com'
  }
]

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // Obsługa zapytania GET na naszym API
  if (requestUrl.pathname === API_ENDPOINT && event.request.method === 'GET') {
    // Zwrócenie stanu danych
    const response = new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
    event.respondWith(response);
  }

  // Obsługa zapytań POST na naszym API
  else if (requestUrl.pathname === API_ENDPOINT && event.request.method === 'POST') {
    event.respondWith(
      // Dodanie nowego rekordu
      new Promise(resolve => {
        event.request.json().then(newRecord => {
          data.push(newRecord);
          resolve(new Response(null, { status: 204 }));
        });
      })
    );
  }

  // Obsługa zapytań PUT na naszym API
  else if (requestUrl.pathname.startsWith(API_ENDPOINT) && event.request.method === 'PUT') {
    event.respondWith(
      // Edycja istniejącego rekordu
      new Promise(resolve => {
        event.request.json().then(updatedRecord => {
          const recordIndex = data.findIndex(record => record.id === updatedRecord.id);
          if (recordIndex !== -1) {
            data[recordIndex] = updatedRecord;
            resolve(new Response(null, { status: 204 }));
          } else {
            resolve(new Response(null, { status: 404 }));
          }
        });
      })
    );
  }

  // Obsługa zapytań DELETE na naszym API
  else if (requestUrl.pathname.startsWith(API_ENDPOINT) && event.request.method === 'DELETE') {
    event.respondWith(
      // Usunięcie rekordu
      new Promise(resolve => {
        const recordId = parseInt(requestUrl.pathname.split('/').pop());
        const recordIndex = data.findIndex(record => record.id === recordId);
        if (recordIndex !== -1) {
          data.splice(recordIndex, 1);
          resolve(new Response(null, { status: 204 }));
        } else {
          resolve(new Response(null, { status: 404 }));
        }
      })
    );
  }
});