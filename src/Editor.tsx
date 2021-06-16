import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import './editor.scss';

import ClipBoard from 'clipboard';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

new ClipBoard('.copy-button');

type TreeContent = {
  id: number;
  text: string;
  depth: number;
  depthIndicator: string;
};

type TreeProps = {
  treeContent: TreeContent;
  treeContents: TreeContent[];
  setTreeContents: Dispatch<SetStateAction<TreeContent[]>>;
  focusId: number;
  setFocusId: Dispatch<SetStateAction<number>>;
  focusIdChanged: boolean;
  setFocusIdChanged: Dispatch<SetStateAction<boolean>>;
};

function Tree({ treeContent, treeContents, setTreeContents, focusId, setFocusId, focusIdChanged, setFocusIdChanged }: TreeProps) {
  const { id, depth, text } = treeContent;

  const isLast = useCallback(
    (id: number, depth: number) => {
      for (const value of treeContents.slice(id)) {
        if (value.depth < depth) {
          return true;
        }
        if (value.depth === depth) {
          return false;
        }
      }
      return true;
    },
    [treeContents]
  );

  const parentsLastStatus = useMemo(() => {
    const results = [];
    let findDepth = depth - 1;
    for (let i = id - 2; i >= 0; i--) {
      if (treeContents[i].depth === findDepth) {
        findDepth--;
        results.push(isLast(treeContents[i].id, treeContents[i].depth));
      }
    }

    return results.reverse();
  }, [treeContents]);

  const contentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusId === id) {
      contentRef.current?.focus();
      setFocusIdChanged(false);
    }
  }, [focusIdChanged]);

  const depthIndicator = useMemo(() => {
    return (
      parentsLastStatus.map((isLast) => (isLast ? '\u00A0\u00A0\u00A0' : '│\u00A0\u00A0')).join('') +
      (isLast(id, depth) ? '└─' : '├─') +
      '\u00A0'
    );
  }, [parentsLastStatus]);

  useEffect(() => {
    const newTreeContents = [...treeContents];
    newTreeContents[id - 1].depthIndicator = depthIndicator;
    setTreeContents(newTreeContents);
  }, [depthIndicator]);

  return (
    <>
      <div>
        <span>{depthIndicator}</span>
        <input
          contentEditable={true}
          ref={contentRef}
          placeholder='Folder or File Name'
          value={text}
          onChange={(e) => {
            const newTreeContents = [...treeContents];
            newTreeContents[id - 1].text = e.target.value;
            setTreeContents(newTreeContents);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Tab') {
              if (id !== 1) {
                e.preventDefault();
              }

              if (depth !== 1 && e.shiftKey) {
                const newTreeContents = treeContents.map((content, index) => ({
                  ...content,
                  depth: index + 1 === id ? content.depth - 1 : content.depth,
                }));

                for (let i = id; i < newTreeContents.length; i++) {
                  if (depth >= newTreeContents[i].depth) {
                    break;
                  }

                  newTreeContents[i].depth = newTreeContents[i].depth - 1;
                }

                setTreeContents(newTreeContents);
              }
            }

            if (e.key === 'Backspace') {
              if (id !== 1 && (treeContents[id]?.depth ?? depth) <= depth && treeContents[id - 1].text === '') {
                const newTreeContents = [...treeContents];
                newTreeContents.splice(id - 1, 1);

                for (let i = id - 1; i < newTreeContents.length; i++) {
                  newTreeContents[i] = {
                    ...newTreeContents[i],
                    id: i + 1,
                  };
                }

                setTreeContents(newTreeContents);
                setFocusId(id - 1);
                setFocusIdChanged(true);
              }
            }

            if (e.key === 'ArrowUp') {
              if (id !== 1 && e.keyCode === 38) {
                setFocusId(id - 1);
                setFocusIdChanged(true);
              }
            }
            if (e.key === 'ArrowDown' && e.keyCode === 40) {
              if (treeContents.length !== id) {
                setFocusId(id + 1);
                setFocusIdChanged(true);
              }
            }
            if (e.key === 'Enter' && e.keyCode === 13) {
              e.preventDefault();
              const newTreeContents = [...treeContents];
              newTreeContents.splice(id, 0, { id: id + 1, text: '', depth, depthIndicator: '' });

              for (let i = id; i < newTreeContents.length; i++) {
                newTreeContents[i] = {
                  ...newTreeContents[i],
                  id: i + 1,
                };
              }

              setTreeContents(newTreeContents);
              setFocusId(id + 1);
              setFocusIdChanged(true);
            }

            if (!e.shiftKey && e.key === 'Tab') {
              e.preventDefault();

              if (id !== 1 && treeContents[id - 2].depth + 1 !== depth) {
                setTreeContents(
                  treeContents.map((content, index) => ({
                    ...content,
                    depth: index + 1 === id ? content.depth + 1 : content.depth,
                  }))
                );
              }
            }
          }}
        />
      </div>
    </>
  );
}

export function Editor() {
  const [rootText, setRootText] = useState<string>('');

  const [treeContents, setTreeContents] = useState<TreeContent[]>([{ id: 1, depth: 1, text: '', depthIndicator: '' }]);
  const [focusId, setFocusId] = useState<number>(1);
  const [focusIdChanged, setFocusIdChanged] = useState<boolean>(false);

  const [copyClicked, setCopyClicked] = useState(false);

  const [githubRepositoryUrl, setGithubRepositoryUrl] = useState<string>('');

  function onSubmit(e: React.MouseEvent<HTMLInputElement, MouseEvent> | React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    fetch(`https://api.github.com/repos/${githubRepositoryUrl.split('https://github.com/').reverse()[0]}/git/trees/${branch}?recursive=1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setTreeContents(
          response.tree.map((content: any, index: number) => {
            const depth = content.path.split('/');
            const textIndex = depth.length;
            return {
              id: index + 1,
              depth: textIndex,
              text: depth[textIndex - 1],
              depthIndicator: '',
            };
          })
        );
        setRootText(githubRepositoryUrl.split('/')[1]);
        console.log('Success:', JSON.stringify(response));
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('깃허브로 부터 정보를 불러오는데 실패하였습니다.');
      });
  }

  const [branch, setBranch] = useState<string>('main');

  const onClickDownloadTree = useCallback(() => {
    const zip = new JSZip();
    const folders = [zip.folder(rootText)];

    treeContents.forEach((content, index) => {
      if (index !== 0) return;
      if (content.depth < treeContents[index - 1]?.depth) {
        folders.pop();

        if (treeContents[index - 1].text.indexOf('.') === -1) {
          folders.pop();
        }
      } else if (content.depth === treeContents[index - 1]?.depth) {
        if (treeContents[index - 1].text.indexOf('.') === -1) {
          folders.pop();
        }
      }

      if (content.text.indexOf('.') >= 0) {
        folders[folders.length - 1]?.file(content.text, '');
      } else {
        folders.push(folders[folders.length - 1]?.folder(content.text) ?? null);
      }
    });

    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, 'project-tree.zip');
    });
  }, [treeContents]);

  return (
    <section>
      <div>
        <h2>Project Tree</h2>
        <form className='github-repository-wrapper' onSubmit={onSubmit}>
          <input
            type='text'
            value={githubRepositoryUrl}
            placeholder='Generate by github repository url(e.g., woochanleee/project-tree-generator)'
            onChange={(e) => setGithubRepositoryUrl(e.target.value)}
          />
          <input type='text' value={branch} onChange={(e) => setBranch(e.target.value)} placeholder='branch name' />
          <input type='submit' onClick={onSubmit} />
        </form>
        <div className='editor'>
          <button onClick={onClickDownloadTree}>
            <svg viewBox='0 0 16 16' version='1.1' width='16' height='16' aria-hidden='true'>
              <path
                fillRule='evenodd'
                d='M3.5 1.75a.25.25 0 01.25-.25h3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h2.086a.25.25 0 01.177.073l2.914 2.914a.25.25 0 01.073.177v8.586a.25.25 0 01-.25.25h-.5a.75.75 0 000 1.5h.5A1.75 1.75 0 0014 13.25V4.664c0-.464-.184-.909-.513-1.237L10.573.513A1.75 1.75 0 009.336 0H3.75A1.75 1.75 0 002 1.75v11.5c0 .649.353 1.214.874 1.515a.75.75 0 10.752-1.298.25.25 0 01-.126-.217V1.75zM8.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM6 5.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 016 5.25zm2 1.5A.75.75 0 018.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 6.75zm-1.25.75a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM8 9.75A.75.75 0 018.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 9.75zm-.75.75a1.75 1.75 0 00-1.75 1.75v3c0 .414.336.75.75.75h2.5a.75.75 0 00.75-.75v-3a1.75 1.75 0 00-1.75-1.75h-.5zM7 12.25a.25.25 0 01.25-.25h.5a.25.25 0 01.25.25v2.25H7v-2.25z'></path>
            </svg>
          </button>
          <button
            className={`copy-button ${copyClicked ? 'success' : ''}`}
            data-clipboard-text={
              '```\n' +
              `📦 ${rootText}\n` +
              treeContents.map(({ depthIndicator, text }) => depthIndicator + text).join('\n') +
              '\n```' +
              '\n©generated by [Project Tree Generator](https://woochanleee.github.io/project-tree-generator)'
            }
            onClick={() => {
              setCopyClicked(true);
              setTimeout(() => {
                setCopyClicked(false);
              }, 1000);
            }}>
            <i />
          </button>
          <div>
            <span>📦</span>
            <input placeholder='Root Folder Name' value={rootText} onChange={(e) => setRootText(e.target.value)} />
          </div>
          {treeContents.map((treeContent) => (
            <Tree
              key={treeContent.id}
              treeContent={treeContent}
              treeContents={treeContents}
              setTreeContents={setTreeContents}
              focusId={focusId}
              setFocusId={setFocusId}
              focusIdChanged={focusIdChanged}
              setFocusIdChanged={setFocusIdChanged}
            />
          ))}
        </div>
        <div className='manual-wrapper'>
          <h3>Manual</h3>
          <p>↵: New Folder</p>
          <p>⌫: Delete Folder</p>
          <p>⇥: Depth +1</p>
          <p>⇧ + ⇥: Depth -1</p>
          <p>△: Up</p>
          <p>▽: Down</p>
          <p>
            <img
              src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01Ljc1IDFhLjc1Ljc1IDAgMDAtLjc1Ljc1djNjMCAuNDE0LjMzNi43NS43NS43NWg0LjVhLjc1Ljc1IDAgMDAuNzUtLjc1di0zYS43NS43NSAwIDAwLS43NS0uNzVoLTQuNXptLjc1IDNWMi41aDNWNGgtM3ptLTIuODc0LS40NjdhLjc1Ljc1IDAgMDAtLjc1Mi0xLjI5OEExLjc1IDEuNzUgMCAwMDIgMy43NXY5LjVjMCAuOTY2Ljc4NCAxLjc1IDEuNzUgMS43NWg4LjVBMS43NSAxLjc1IDAgMDAxNCAxMy4yNXYtOS41YTEuNzUgMS43NSAwIDAwLS44NzQtMS41MTUuNzUuNzUgMCAxMC0uNzUyIDEuMjk4LjI1LjI1IDAgMDEuMTI2LjIxN3Y5LjVhLjI1LjI1IDAgMDEtLjI1LjI1aC04LjVhLjI1LjI1IDAgMDEtLjI1LS4yNXYtOS41YS4yNS4yNSAwIDAxLjEyNi0uMjE3eiIvPjwvc3ZnPg=='
              alt='copy button'
            />
            : Copy Project Tree Code For Markdown
          </p>
        </div>
      </div>
    </section>
  );
}
