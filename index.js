class WatchFileChangeAndRunCallbackWebpackPlugin {
  constructor(opts) {
    this.opts = opts;
  }

  apply(compiler) {
    compiler.hooks.watchRun.tap(
      'WatchFileChangeAndRunCallbackWebpackPlugin',
      (comp) => {
        if (!comp.modifiedFiles) return;

        // ONLY One
        const changedFile = [...comp.modifiedFiles][0];
        if (!changedFile) return;

        this.opts.matchs.forEach((m) => {
          if (!m.filePath || m.filePath !== changedFile) return;

          if (m.callback && typeof m.callback === 'function') {
            console.log('----------------------------------');
            console.log('FILE CHANGE:', changedFile);
            console.log('----------------------------------');

            m.callback();
          }
        });
      },
    );
  }
}

module.exports = WatchFileChangeAndRunCallbackWebpackPlugin;
