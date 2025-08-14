# 🚀 AlgoFlow

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Explore CPU and Disk Scheduling Algorithms with Interactive Step-by-Step Computation**

[🎯 Live Demo](#-features) • [🚀 Quick Start](#-quick-start) • [📚 Algorithms](#-algorithms) • [🛠️ Development](#-development)

</div>

---

## 📖 Table of Contents

- [🎯 Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [📚 Algorithms](#-algorithms)
  - [💾 Disk Scheduling Algorithms](#-disk-scheduling-algorithms)
  - [🖥️ CPU Scheduling Algorithms](#️-cpu-scheduling-algorithms)
- [🛠️ Tech Stack](#️-tech-stack)
- [🎨 UI Components](#-ui-components)
- [📁 Project Structure](#-project-structure)
- [🔧 Development](#-development)
- [📝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🎯 Features

<details open>
<summary><strong>✨ Interactive Algorithm Visualization</strong></summary>

- **Step-by-step computation** with detailed process breakdown
- **Real-time Gantt charts** for visual timeline representation
- **Performance metrics** calculation (Turnaround Time, Waiting Time, etc.)
- **Interactive input forms** for custom process configurations

</details>

<details>
<summary><strong>🎨 Modern User Interface</strong></summary>

- **Dark/Light mode** toggle for comfortable viewing
- **Responsive design** that works on all devices
- **Beautiful animations** powered by Tailwind CSS
- **Intuitive navigation** with search functionality

</details>

<details>
<summary><strong>📊 Comprehensive Algorithm Coverage</strong></summary>

- **6 Disk Scheduling Algorithms** - FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK
- **8 CPU Scheduling Algorithms** - Both preemptive and non-preemptive
- **Detailed explanations** for each algorithm
- **Performance comparisons** and analysis

</details>

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18.0 or higher)
- **pnpm** (recommended) or npm
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/RegieSanJuan/AlgoFlow.git

# Navigate to project directory
cd AlgoFlow

# Install dependencies
pnpm install
# or
npm install

# Start development server
pnpm dev
# or
npm run dev
```

### 🌐 Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

---

## 📚 Algorithms

### 💾 Disk Scheduling Algorithms

<table>
<tr>
<td width="50%">

#### 🔵 **FCFS** - First Come First Serve

- **Description**: Processes requests in order of arrival
- **Time Complexity**: O(n)
- **Best for**: Simple, fair scheduling

#### 🟢 **SSTF** - Shortest Seek Time First

- **Description**: Selects request with minimum seek time
- **Time Complexity**: O(n²)
- **Best for**: Minimizing seek time

#### 🟣 **SCAN** - Elevator Algorithm

- **Description**: Moves in one direction until end
- **Time Complexity**: O(n log n)
- **Best for**: Avoiding starvation

</td>
<td width="50%">

#### 🟠 **C-SCAN** - Circular SCAN

- **Description**: Circular version of SCAN algorithm
- **Time Complexity**: O(n log n)
- **Best for**: Uniform wait times

#### 🩷 **LOOK** - Look Algorithm

- **Description**: SCAN without going to disk ends
- **Time Complexity**: O(n log n)
- **Best for**: Efficient seek optimization

#### 🔷 **C-LOOK** - Circular LOOK

- **Description**: Circular version of LOOK algorithm
- **Time Complexity**: O(n log n)
- **Best for**: Optimized circular scanning

</td>
</tr>
</table>

### 🖥️ CPU Scheduling Algorithms

#### 📋 Non-Preemptive Algorithms

| Algorithm                   | Abbreviation | Description                | Use Case                        |
| --------------------------- | ------------ | -------------------------- | ------------------------------- |
| **First Come First Serve**  | FCFS         | Processes in arrival order | Simple batch systems            |
| **Shortest Job First**      | SJF          | Shortest burst time first  | Minimizing average waiting time |
| **Non-Preemptive Priority** | NPP          | Based on priority values   | Priority-based systems          |

#### ⚡ Preemptive Algorithms

| Algorithm                         | Abbreviation | Description                   | Use Case                |
| --------------------------------- | ------------ | ----------------------------- | ----------------------- |
| **Shortest Remaining Time First** | SRTF         | Preemptive SJF algorithm      | Interactive systems     |
| **Round Robin**                   | RR           | Time quantum based scheduling | Time-sharing systems    |
| **Preemptive Priority**           | PP           | Priority with preemption      | Real-time systems       |
| **Multi Level Queue**             | MLQ          | Multiple separate queues      | Mixed system types      |
| **Multi Level Feedback Queue**    | MLFQ         | Dynamic priority queues       | General-purpose systems |

---

## 🛠️ Tech Stack

<div align="center">

| Category     | Technologies                                                                                                                                                                                                                                                                                               |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | ![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js) ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) |
| **Styling**  | ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) ![Radix UI](https://img.shields.io/badge/-Radix_UI-161618?style=flat-square&logo=radix-ui&logoColor=white)                                                                          |
| **Charts**   | ![Recharts](https://img.shields.io/badge/-Recharts-FF6384?style=flat-square)                                                                                                                                                                                                                               |
| **Forms**    | ![React Hook Form](https://img.shields.io/badge/-React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white) ![Zod](https://img.shields.io/badge/-Zod-3E67B1?style=flat-square&logo=zod&logoColor=white)                                                                                  |
| **Tools**    | ![PNPM](https://img.shields.io/badge/-PNPM-F69220?style=flat-square&logo=pnpm&logoColor=white) ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)                                                                                                        |

</div>

---

## 🎨 UI Components

AlgoFlow uses a comprehensive set of **shadcn/ui** components:

<details>
<summary><strong>📦 Available Components</strong></summary>

- ✅ **Layout**: Cards, Sheets, Dialogs, Accordions
- ✅ **Forms**: Inputs, Buttons, Selects, Checkboxes
- ✅ **Navigation**: Breadcrumbs, Tabs, Menus
- ✅ **Data Display**: Tables, Charts, Progress bars
- ✅ **Feedback**: Alerts, Toasts, Tooltips
- ✅ **Theme**: Dark/Light mode support

</details>

---

## 📁 Project Structure

```
AlgoFlow/
├── 📁 app/                    # Next.js App Router
│   ├── 📄 layout.tsx         # Root layout with theme provider
│   ├── 📄 page.tsx           # Homepage with algorithm cards
│   ├── 📄 loading.tsx        # Loading UI component
│   └── 📁 fcfs/              # FCFS algorithm implementation
│       └── 📄 page.tsx       # Interactive FCFS calculator
├── 📁 components/             # Reusable UI components
│   ├── 📄 theme-provider.tsx # Theme context provider
│   └── 📁 ui/                # shadcn/ui components
├── 📁 hooks/                  # Custom React hooks
├── 📁 lib/                    # Utility functions
├── 📁 public/                 # Static assets
├── 📁 styles/                 # Global styles
├── 📄 package.json           # Project dependencies
├── 📄 tailwind.config.js     # Tailwind configuration
└── 📄 tsconfig.json          # TypeScript configuration
```

---

## 🔧 Development

### 🚦 Available Scripts

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### 🎯 Adding New Algorithms

1. **Create a new route** in the `app` directory
2. **Implement the algorithm logic** with step-by-step computation
3. **Add the algorithm card** to the homepage
4. **Update the search functionality**

### 🎨 Customizing UI

- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Components**: Extend or create new components in `components/ui/`
- **Themes**: Update `theme-provider.tsx` for additional theme options

---

## 📝 Contributing

We welcome contributions! Here's how you can help:

<details>
<summary><strong>🤝 How to Contribute</strong></summary>

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

</details>

### 🎯 Areas for Contribution

- [ ] **New scheduling algorithms** implementation
- [ ] **Performance optimizations** and improvements
- [ ] **UI/UX enhancements** and animations
- [ ] **Documentation** and tutorials
- [ ] **Test coverage** expansion
- [ ] **Mobile responsiveness** improvements

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ for Computer Science Education**

[⭐ Star this repo](../../stargazers) • [🐛 Report Bug](../../issues) • [💡 Request Feature](../../issues)

---

### 🔗 Connect & Learn More

[![GitHub](https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/RegieSanJuan)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com)
[![Twitter](https://img.shields.io/badge/-Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com)

</div>
