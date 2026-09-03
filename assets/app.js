// 西安陆港绿色效应测度项目 - 交互式功能脚本

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  // 平滑滚动
  initSmoothScroll();

  // 导航栏滚动效果
  initNavbarScroll();

  // 数据可视化页面图表初始化
  if (document.getElementById('pollutionCanvas')) {
    // 等待Chart.js加载完成
    if (typeof Chart !== 'undefined') {
      initCharts();
    } else {
      console.warn('Chart.js未加载，无法初始化图表');
    }
  }

  // 移动端导航切换
  initMobileNav();
});

// 平滑滚动到锚点
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// 导航栏滚动阴影效果
function initNavbarScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}

// 移动端导航菜单
function initMobileNav() {
  // 简化版：直接使用CSS媒体查询处理响应式
  // 如需汉堡菜单，可在此扩展
}

// 图表初始化（数据可视化页面）
function initCharts() {
  // PM2.5浓度趋势图
  const pollutionCanvas = document.getElementById('pollutionCanvas');
  if (pollutionCanvas) {
    new Chart(pollutionCanvas, {
      type: 'line',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
        datasets: [
          {
            label: '处理组（西安陆港）',
            data: [58, 56, 51, 48, 46, 44, 42],
            borderColor: '#17766B',
            backgroundColor: 'rgba(23, 118, 107, 0.1)',
            tension: 0.3,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: true
          },
          {
            label: '对照组（平均）',
            data: [57, 56, 55, 54, 52, 51, 50],
            borderColor: '#B46A00',
            backgroundColor: 'rgba(180, 106, 0, 0.1)',
            tension: 0.3,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: {
                size: 13
              }
            }
          },
          title: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'PM2.5浓度 (μg/m³)',
              font: {
                size: 13
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });
  }

  // 政策关键词演变趋势图
  const policyTrendCanvas = document.getElementById('policyTrendChart');
  if (policyTrendCanvas) {
    new Chart(policyTrendCanvas, {
      type: 'bar',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
        datasets: [
          {
            label: '开行量',
            data: [45, 42, 38, 32, 28, 22, 18],
            backgroundColor: '#0D3B4F'
          },
          {
            label: '绿色低碳',
            data: [12, 18, 25, 32, 38, 42, 45],
            backgroundColor: '#17766B'
          },
          {
            label: '数字化',
            data: [8, 12, 18, 24, 32, 38, 40],
            backgroundColor: '#2C7A3F'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: {
                size: 13
              }
            }
          }
        },
        scales: {
          x: {
            stacked: false,
            grid: {
              display: false
            }
          },
          y: {
            title: {
              display: true,
              text: '词频占比 (%)',
              font: {
                size: 13
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          }
        }
      }
    });
  }

  // 居民满意度分布图
  const satisfactionCanvas = document.getElementById('satisfactionCanvas');
  if (satisfactionCanvas) {
    new Chart(satisfactionCanvas, {
      type: 'doughnut',
      data: {
        labels: ['非常满意', '满意', '一般', '不满意'],
        datasets: [{
          data: [42, 44, 11, 3],
          backgroundColor: ['#17766B', '#2C7A3F', '#B46A00', '#5E6A82'],
          borderWidth: 2,
          borderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: {
                size: 13
              }
            }
          },
          title: {
            display: true,
            text: '居民综合满意度分布 (n=186)',
            font: {
              size: 14,
              weight: 'bold'
            },
            padding: {
              bottom: 20
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return label + ': ' + value + '% (' + percentage + '%)';
              }
            }
          }
        }
      }
    });
  }

  // 夜间灯光强度变化图
  const lightCanvas = document.getElementById('lightCanvas');
  if (lightCanvas) {
    new Chart(lightCanvas, {
      type: 'line',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
        datasets: [
          {
            label: '核心区（0-3km）',
            data: [100, 112, 126, 142, 158, 172, 185],
            borderColor: '#17766B',
            backgroundColor: 'rgba(23, 118, 107, 0.2)',
            tension: 0.3,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: true
          },
          {
            label: '辐射区（3-10km）',
            data: [100, 105, 112, 120, 128, 136, 142],
            borderColor: '#2C7A3F',
            backgroundColor: 'rgba(44, 122, 63, 0.2)',
            tension: 0.3,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: true
          },
          {
            label: '腹地（10-50km）',
            data: [100, 103, 106, 110, 114, 118, 122],
            borderColor: '#B46A00',
            backgroundColor: 'rgba(180, 106, 0, 0.2)',
            tension: 0.3,
            borderWidth: 3,
            pointRadius: 5,
            pointHoverRadius: 7,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: {
                size: 13
              }
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: '指数 (2020=100)',
              font: {
                size: 13
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });
  }
}

// 数据仪表板刷新功能
function updateDashboard() {
  const timeRange = document.getElementById('timeRange');
  if (!timeRange) return;

  const selected = timeRange.value;

  // 模拟数据更新（实际应用中可从后端API获取）
  const data = {
    '2020-2026全周期': {
      carbon: '18.7%',
      cost: '12.3%',
      satisfaction: '86%'
    },
    '2020-2022开通初期': {
      carbon: '12.4%',
      cost: '8.6%',
      satisfaction: '78%'
    },
    '2023-2026成熟期': {
      carbon: '24.1%',
      cost: '15.2%',
      satisfaction: '91%'
    }
  };

  // 简化版：直接显示提示
  alert(`时间段"${selected}"的数据已刷新\n碳排放降幅: ${data[selected].carbon}\n物流成本降幅: ${data[selected].cost}\n居民满意度: ${data[selected].satisfaction}`);
}

// 返回顶部按钮（可选功能）
function initBackToTop() {
  const btn = document.createElement('button');
  btn.innerHTML = '↑';
  btn.style.cssText = `
    position: fixed;
    bottom: 40px;
    right: 40px;
    width: 50px;
    height: 50px;
    background: #17766B;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    display: none;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    transition: opacity 0.3s;
  `;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  });

  document.body.appendChild(btn);
}

// 如需启用返回顶部按钮，取消下行注释
// initBackToTop();

// ======================================
// 空间地图渲染模块
// ======================================

// 1. PM2.5浓度空间分布图
function renderPM25Map() {
  const container = document.getElementById('pm25Map');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // 创建SVG画布
  const svg = `
    <svg width="${width}" height="${height}" style="background:#F8F9FA">
      <defs>
        <radialGradient id="pm25Gradient1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#ffa07a;stop-opacity:0.2" />
        </radialGradient>
        <radialGradient id="pm25Gradient2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#ffa07a;stop-opacity:0.6" />
          <stop offset="100%" style="stop-color:#98d8c8;stop-opacity:0.2" />
        </radialGradient>
        <radialGradient id="pm25Gradient3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#98d8c8;stop-opacity:0.6" />
          <stop offset="100%" style="stop-color:#6fcdbe;stop-opacity:0.1" />
        </radialGradient>
      </defs>

      <!-- 标题 -->
      <text x="${width/2}" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#0D3B4F">
        西安陆港及周边PM2.5浓度空间分布（2020-2026）
      </text>

      <!-- 坐标系 -->
      <line x1="50" y1="${height-50}" x2="${width-50}" y2="${height-50}" stroke="#BFD3DA" stroke-width="2"/>
      <line x1="50" y1="50" x2="50" y2="${height-50}" stroke="#BFD3DA" stroke-width="2"/>

      <!-- 港务区核心区（低浓度区） -->
      <circle cx="${width/2}" cy="${height/2}" r="60" fill="url(#pm25Gradient3)" />
      <text x="${width/2}" y="${height/2}" text-anchor="middle" font-size="12" fill="#17766B" font-weight="bold">
        港务区核心
      </text>
      <text x="${width/2}" y="${height/2+15}" text-anchor="middle" font-size="11" fill="#5E6A82">
        32 μg/m³
      </text>

      <!-- 辐射区（中等浓度） -->
      <circle cx="${width/2-120}" cy="${height/2-80}" r="45" fill="url(#pm25Gradient2)" />
      <text x="${width/2-120}" y="${height/2-80}" text-anchor="middle" font-size="11" fill="#B46A00">辐射区1</text>
      <text x="${width/2-120}" y="${height/2-80+14}" text-anchor="middle" font-size="10" fill="#5E6A82">48 μg/m³</text>

      <circle cx="${width/2+130}" cy="${height/2-70}" r="50" fill="url(#pm25Gradient2)" />
      <text x="${width/2+130}" y="${height/2-70}" text-anchor="middle" font-size="11" fill="#B46A00">辐射区2</text>
      <text x="${width/2+130}" y="${height/2-70+14}" text-anchor="middle" font-size="10" fill="#5E6A82">45 μg/m³</text>

      <!-- 外围区（较高浓度） -->
      <circle cx="${width/2-150}" cy="${height/2+90}" r="40" fill="url(#pm25Gradient1)" />
      <text x="${width/2-150}" y="${height/2+90}" text-anchor="middle" font-size="10" fill="#c92a2a">外围区1</text>
      <text x="${width/2-150}" y="${height/2+90+13}" text-anchor="middle" font-size="9" fill="#5E6A82">61 μg/m³</text>

      <circle cx="${width/2+120}" cy="${height/2+100}" r="38" fill="url(#pm25Gradient1)" />
      <text x="${width/2+120}" y="${height/2+100}" text-anchor="middle" font-size="10" fill="#c92a2a">外围区2</text>
      <text x="${width/2+120}" y="${height/2+100+13}" text-anchor="middle" font-size="9" fill="#5E6A82">58 μg/m³</text>

      <!-- 图例 -->
      <g transform="translate(${width-180}, 60)">
        <rect x="0" y="0" width="150" height="90" fill="white" stroke="#BFD3DA" rx="4"/>
        <text x="10" y="18" font-size="11" font-weight="bold" fill="#0D3B4F">浓度等级</text>
        <circle cx="20" cy="35" r="8" fill="url(#pm25Gradient3)"/>
        <text x="35" y="39" font-size="10" fill="#5E6A82">低 (&lt;40)</text>
        <circle cx="20" cy="55" r="8" fill="url(#pm25Gradient2)"/>
        <text x="35" y="59" font-size="10" fill="#5E6A82">中 (40-55)</text>
        <circle cx="20" cy="75" r="8" fill="url(#pm25Gradient1)"/>
        <text x="35" y="79" font-size="10" fill="#5E6A82">高 (&gt;55)</text>
      </g>

      <!-- 坐标轴标签 -->
      <text x="${width/2}" y="${height-15}" text-anchor="middle" font-size="11" fill="#5E6A82">
        东西向距离 (km)
      </text>
      <text x="20" y="${height/2}" text-anchor="middle" font-size="11" fill="#5E6A82" transform="rotate(-90, 20, ${height/2})">
        南北向距离 (km)
      </text>
    </svg>
  `;

  container.innerHTML = svg;
}

// 2. 产业集聚空间分布图
function renderIndustryMap() {
  const container = document.getElementById('industryMap');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  const svg = `
    <svg width="${width}" height="${height}" style="background:#fff">
      <defs>
        <radialGradient id="industryGradient1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:0.9" />
          <stop offset="100%" style="stop-color:#fbbf24;stop-opacity:0.3" />
        </radialGradient>
        <radialGradient id="industryGradient2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:0.7" />
          <stop offset="100%" style="stop-color:#fde68a;stop-opacity:0.2" />
        </radialGradient>
        <radialGradient id="industryGradient3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#fde68a;stop-opacity:0.5" />
          <stop offset="100%" style="stop-color:#fef3c7;stop-opacity:0.1" />
        </radialGradient>
      </defs>

      <!-- 标题 -->
      <text x="${width/2}" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#0D3B4F">
        产业集聚空间分布（基于夜间灯光强度）
      </text>

      <!-- 港务区高集聚核心 -->
      <circle cx="${width/2}" cy="${height/2}" r="70" fill="url(#industryGradient1)" stroke="#f59e0b" stroke-width="2"/>
      <text x="${width/2}" y="${height/2-10}" text-anchor="middle" font-size="13" fill="#7c2d12" font-weight="bold">
        港务区核心
      </text>
      <text x="${width/2}" y="${height/2+8}" text-anchor="middle" font-size="11" fill="#5E6A82">
        企业密度: 1200家/km²
      </text>
      <text x="${width/2}" y="${height/2+24}" text-anchor="middle" font-size="10" fill="#5E6A82">
        灯光强度: 89
      </text>

      <!-- 中等集聚区1 -->
      <circle cx="${width/2-140}" cy="${height/2-70}" r="55" fill="url(#industryGradient2)" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="${width/2-140}" y="${height/2-70}" text-anchor="middle" font-size="11" fill="#B46A00">中集聚区</text>
      <text x="${width/2-140}" y="${height/2-70+14}" text-anchor="middle" font-size="10" fill="#5E6A82">580家/km²</text>
      <text x="${width/2-140}" y="${height/2-70+28}" text-anchor="middle" font-size="9" fill="#5E6A82">强度: 62</text>

      <!-- 中等集聚区2 -->
      <circle cx="${width/2+135}" cy="${height/2-85}" r="50" fill="url(#industryGradient2)" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="${width/2+135}" y="${height/2-85}" text-anchor="middle" font-size="11" fill="#B46A00">中集聚区</text>
      <text x="${width/2+135}" y="${height/2-85+14}" text-anchor="middle" font-size="10" fill="#5E6A82">620家/km²</text>
      <text x="${width/2+135}" y="${height/2-85+28}" text-anchor="middle" font-size="9" fill="#5E6A82">强度: 65</text>

      <!-- 低集聚区1 -->
      <circle cx="${width/2-160}" cy="${height/2+100}" r="45" fill="url(#industryGradient3)" stroke="#fde68a" stroke-width="1"/>
      <text x="${width/2-160}" y="${height/2+100}" text-anchor="middle" font-size="10" fill="#92400e">低集聚区</text>
      <text x="${width/2-160}" y="${height/2+100+13}" text-anchor="middle" font-size="9" fill="#5E6A82">280家/km²</text>

      <!-- 低集聚区2 -->
      <circle cx="${width/2+125}" cy="${height/2+110}" r="42" fill="url(#industryGradient3)" stroke="#fde68a" stroke-width="1"/>
      <text x="${width/2+125}" y="${height/2+110}" text-anchor="middle" font-size="10" fill="#92400e">低集聚区</text>
      <text x="${width/2+125}" y="${height/2+110+13}" text-anchor="middle" font-size="9" fill="#5E6A82">310家/km²</text>

      <!-- 低集聚区3 -->
      <circle cx="${width/2}" cy="${height/2+140}" r="38" fill="url(#industryGradient3)" stroke="#fde68a" stroke-width="1"/>
      <text x="${width/2}" y="${height/2+140}" text-anchor="middle" font-size="10" fill="#92400e">低集聚区</text>
      <text x="${width/2}" y="${height/2+140+13}" text-anchor="middle" font-size="9" fill="#5E6A82">250家/km²</text>

      <!-- 图例 -->
      <g transform="translate(${width-190}, 60)">
        <rect x="0" y="0" width="170" height="110" fill="white" stroke="#BFD3DA" rx="4"/>
        <text x="10" y="18" font-size="11" font-weight="bold" fill="#0D3B4F">集聚等级</text>
        <circle cx="20" cy="38" r="9" fill="url(#industryGradient1)" stroke="#f59e0b"/>
        <text x="40" y="42" font-size="10" fill="#5E6A82">高 (&gt;1000家/km²)</text>
        <circle cx="20" cy="62" r="9" fill="url(#industryGradient2)" stroke="#fbbf24"/>
        <text x="40" y="66" font-size="10" fill="#5E6A82">中 (500-1000)</text>
        <circle cx="20" cy="86" r="9" fill="url(#industryGradient3)" stroke="#fde68a"/>
        <text x="40" y="90" font-size="10" fill="#5E6A82">低 (&lt;500)</text>
      </g>

      <!-- 说明文字 -->
      <text x="20" y="${height-15}" font-size="10" fill="#5E6A82">
        数据来源：NPP-VIIRS夜间灯光 + 工商企业注册数据（2020-2026）
      </text>
    </svg>
  `;

  container.innerHTML = svg;
}

// 3. 中欧班列网络通达图
function renderRailwayMap() {
  const container = document.getElementById('railwayMap');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // 主要城市坐标（简化的欧亚大陆投影）
  const cities = {
    xian: { x: width * 0.65, y: height * 0.55, name: '西安' },
    urumqi: { x: width * 0.50, y: height * 0.48, name: '乌鲁木齐' },
    almaty: { x: width * 0.42, y: height * 0.52, name: '阿拉木图' },
    moscow: { x: width * 0.30, y: height * 0.35, name: '莫斯科' },
    warsaw: { x: width * 0.20, y: height * 0.38, name: '华沙' },
    duisburg: { x: width * 0.15, y: height * 0.42, name: '杜伊斯堡' },
    hamburg: { x: width * 0.14, y: height * 0.36, name: '汉堡' },
    madrid: { x: width * 0.08, y: height * 0.50, name: '马德里' }
  };

  let svg = `
    <svg width="${width}" height="${height}" style="background:#F0F7FA">
      <!-- 标题 -->
      <text x="${width/2}" y="25" text-anchor="middle" font-size="16" font-weight="bold" fill="#0D3B4F">
        中欧班列（西安）网络通达图
      </text>

      <!-- 铁路线路 -->
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#17766B" />
        </marker>
      </defs>
  `;

  // 绘制线路
  const routes = [
    ['xian', 'urumqi'],
    ['urumqi', 'almaty'],
    ['almaty', 'moscow'],
    ['moscow', 'warsaw'],
    ['moscow', 'hamburg'],
    ['warsaw', 'duisburg'],
    ['warsaw', 'madrid']
  ];

  routes.forEach(([from, to]) => {
    const fromCity = cities[from];
    const toCity = cities[to];
    svg += `<line x1="${fromCity.x}" y1="${fromCity.y}" x2="${toCity.x}" y2="${toCity.y}"
                  stroke="#17766B" stroke-width="2.5" opacity="0.7" marker-end="url(#arrowhead)"/>`;
  });

  // 绘制城市节点
  Object.values(cities).forEach(city => {
    const isXian = city.name === '西安';
    svg += `
      <circle cx="${city.x}" cy="${city.y}" r="${isXian ? 10 : 7}"
              fill="${isXian ? '#ff6b6b' : '#17766B'}"
              stroke="white" stroke-width="2"/>
      <text x="${city.x}" y="${city.y - 16}" text-anchor="middle"
            font-size="${isXian ? 13 : 11}" font-weight="${isXian ? 'bold' : 'normal'}"
            fill="#0D3B4F">
        ${city.name}
      </text>
    `;
  });

  // 统计信息卡片
  svg += `
    <g transform="translate(${width-210}, 60)">
      <rect x="0" y="0" width="190" height="140" fill="white" stroke="#BFD3DA" rx="6" opacity="0.95"/>
      <text x="15" y="25" font-size="12" font-weight="bold" fill="#0D3B4F">网络覆盖统计</text>

      <text x="15" y="50" font-size="11" fill="#5E6A82">通达欧洲国家</text>
      <text x="150" y="50" text-anchor="end" font-size="16" font-weight="bold" fill="#17766B">25国</text>

      <text x="15" y="75" font-size="11" fill="#5E6A82">通达城市数量</text>
      <text x="150" y="75" text-anchor="end" font-size="16" font-weight="bold" fill="#2C7A3F">220城</text>

      <text x="15" y="100" font-size="11" fill="#5E6A82">累计开行列次</text>
      <text x="150" y="100" text-anchor="end" font-size="16" font-weight="bold" fill="#B46A00">10万+</text>

      <text x="15" y="125" font-size="11" fill="#5E6A82">回程货值占比</text>
      <text x="150" y="125" text-anchor="end" font-size="16" font-weight="bold" fill="#0D3B4F">52%</text>
    </g>

    <!-- 图例 -->
    <g transform="translate(20, 60)">
      <rect x="0" y="0" width="150" height="75" fill="white" stroke="#BFD3DA" rx="4" opacity="0.95"/>
      <text x="10" y="20" font-size="11" font-weight="bold" fill="#0D3B4F">图例</text>
      <circle cx="20" cy="40" r="6" fill="#ff6b6b" stroke="white" stroke-width="2"/>
      <text x="35" y="44" font-size="10" fill="#5E6A82">西安（起点）</text>
      <circle cx="20" cy="60" r="5" fill="#17766B" stroke="white" stroke-width="2"/>
      <text x="35" y="64" font-size="10" fill="#5E6A82">中转/目的地城市</text>
    </g>

    </svg>
  `;

  container.innerHTML = svg;
}

// 在页面加载时渲染所有地图
setTimeout(() => {
  renderPM25Map();
  renderIndustryMap();
  renderRailwayMap();
}, 100);

// 窗口大小改变时重新渲染
window.addEventListener('resize', () => {
  renderPM25Map();
  renderIndustryMap();
  renderRailwayMap();
});
