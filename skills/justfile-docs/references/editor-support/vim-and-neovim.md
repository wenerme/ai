### Vim and Neovim

Vim version 9.1.1042 or better and Neovim version 0.11 or better support
Justfile syntax highlighting out of the box, thanks to
[pbnj](https://github.com/pbnj).

#### `vim-just`

The [vim-just](https://github.com/NoahTheDuke/vim-just) plugin provides syntax
highlighting for `justfile`s.

Install it with your favorite package manager, like
[Plug](https://github.com/junegunn/vim-plug):

```vim
call plug#begin()

Plug 'NoahTheDuke/vim-just'

call plug#end()
```

Or with Vim's built-in package support:

```console
mkdir -p ~/.vim/pack/vendor/start
cd ~/.vim/pack/vendor/start
git clone https://github.com/NoahTheDuke/vim-just.git
```

#### `tree-sitter-just`

[tree-sitter-just](https://github.com/IndianBoy42/tree-sitter-just) is an
[Nvim Treesitter](https://github.com/nvim-treesitter/nvim-treesitter) plugin
for Neovim.

#### Makefile Syntax Highlighting

Vim's built-in makefile syntax highlighting isn't perfect for `justfile`s, but
it's better than nothing. You can put the following in `~/.vim/filetype.vim`:

```vimscript
if exists("did_load_filetypes")
  finish
endif

augroup filetypedetect
  au BufNewFile,BufRead justfile setf make
augroup END
```

Or add the following to an individual `justfile` to enable `make` mode on a
per-file basis:

```text
# vim: set ft=make :
```
