
    document.addEventListener('DOMContentLoaded', function() {
      const form = document.querySelector('.form');

      form.addEventListener('submit', handleSubmit);

      function handleSubmit(event) {
        event.preventDefault();
        
        const delay = parseInt(event.target.elements.delay.value);
        const state = event.target.elements.state.value;

        createPromise(delay, state)
          .then(delay => {
            iziToast.success({
              title: 'Success',
              message: `✅ Fulfilled promise in ${delay}ms`,
              position: 'topRight',
              timeout: 5000,
            });
          })
          .catch(delay => {
            iziToast.error({
              title: 'Error',
              message: `❌ Rejected promise in ${delay}ms`,
              position: 'topRight',
              timeout: 5000,
            });
          });

        form.reset();
      }

      function createPromise(delay, state) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (state === 'fulfilled') {
              resolve(delay);
            } else {
              reject(delay);
            }
          }, delay);
        });
      }
    });
  