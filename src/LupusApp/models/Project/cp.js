import cp from 'child_process';

const exec = (command, args, options) => new Promise((resolve, reject) => {
  let out = '';
  let err = '';
  const p = cp.spawn(command, args, options);
  p.stdout.on('data', data => { out += data });
  p.stderr.on('data', data => { err += data });
  p.on('error', reject);
  p.on('close', (code) => resolve([code, out.trim(), err.trim()]));
});

const spawn = (command, args, options) => new Promise((resolve, reject) => {
  cp.spawn(command, args, options)
    .on('error', reject)
    .on('close', resolve);
});

export default { exec, spawn };
