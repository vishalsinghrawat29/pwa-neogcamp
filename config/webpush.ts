
import webpush from 'web-push';

const publicVapidKey = 'BJZasrx93lvmYKsqCfYuiXfCU_KyNI2PJM1xkvBIvp_SXsvBQ2H1pwmSbBpxoOWIVqpgRpS5fLTWnDoRX2cvBNQ';
const privateVapidKey = 'e1I69lwZVyAfXrJ-Oiog5jGQtvaUCFtkc0P9Ox8NfRk';

export default (): void  => {
  webpush.setVapidDetails(
    'mailto:test@test.com',
    publicVapidKey,
    privateVapidKey,
  );
};