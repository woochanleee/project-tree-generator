import './header.scss';

export function Header() {
  return (
    <header>
      <div>
        <a href='https://github.com/woochanleee/project-tree-generator' target='_blank'>
          <div>
            <h1>Projcet Tree Generator</h1>
          </div>
        </a>
        <a href='https://hits.seeyoufarm.com'>
          <img src='https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fwoochanleee.github.io%2Fproject-tree-generator&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false' />
        </a>
      </div>
    </header>
  );
}
