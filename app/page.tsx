"use client";

import { Search, Play, Cpu, HardDrive, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useMemo } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const diskAlgorithms = [
    {
      name: "FIRST COME FIRST SERVE",
      abbr: "FCFS",
      color: "bg-blue-500",
      description: "Processes requests in order of arrival",
      category: "disk",
    },
    {
      name: "SHORTEST SEEK TIME FIRST",
      abbr: "SSTF",
      color: "bg-green-500",
      description: "Selects request with minimum seek time",
      category: "disk",
    },
    {
      name: "SCAN",
      abbr: "SCAN",
      color: "bg-purple-500",
      description: "Elevator algorithm - moves in one direction",
      category: "disk",
    },
    {
      name: "C-SCAN",
      abbr: "C-SCAN",
      color: "bg-orange-500",
      description: "Circular SCAN algorithm",
      category: "disk",
    },
    {
      name: "LOOK",
      abbr: "LOOK",
      color: "bg-pink-500",
      description: "SCAN without going to disk ends",
      category: "disk",
    },
    {
      name: "C-LOOK",
      abbr: "C-LOOK",
      color: "bg-teal-500",
      description: "Circular LOOK algorithm",
      category: "disk",
    },
  ];

  const cpuNonPreemptive = [
    {
      name: "FIRST COME FIRST SERVE",
      abbr: "FCFS",
      color: "bg-indigo-500",
      description: "Processes in arrival order",
      category: "cpu-non-preemptive",
    },
    {
      name: "SHORTEST JOB FIRST",
      abbr: "SJF",
      color: "bg-emerald-500",
      description: "Shortest burst time first",
      category: "cpu-non-preemptive",
    },
    {
      name: "NON-PREEMPTIVE PRIORITY",
      abbr: "NPP",
      color: "bg-rose-500",
      description: "Based on priority values",
      category: "cpu-non-preemptive",
    },
  ];

  const cpuPreemptive = [
    {
      name: "SHORTEST REMAINING TIME FIRST",
      abbr: "SRTF",
      color: "bg-cyan-500",
      description: "Preemptive SJF algorithm",
      category: "cpu-preemptive",
    },
    {
      name: "ROUND ROBIN",
      abbr: "RR",
      color: "bg-amber-500",
      description: "Time quantum based scheduling",
      category: "cpu-preemptive",
    },
    {
      name: "PREEMPTIVE PRIORITY",
      abbr: "PP",
      color: "bg-violet-500",
      description: "Priority with preemption",
      category: "cpu-preemptive",
    },
    {
      name: "MULTI LEVEL QUEUE",
      abbr: "MLQ",
      color: "bg-lime-500",
      description: "Multiple separate queues",
      category: "cpu-preemptive",
    },
    {
      name: "MULTI LEVEL FEEDBACK QUEUE",
      abbr: "MLFQ",
      color: "bg-red-500",
      description: "Dynamic priority queues",
      category: "cpu-preemptive",
    },
  ];

  const filteredAlgorithms = useMemo(() => {
    const allAlgorithms = [
      ...diskAlgorithms,
      ...cpuNonPreemptive,
      ...cpuPreemptive,
    ];

    if (!searchQuery.trim()) {
      return {
        disk: diskAlgorithms,
        cpuNonPreemptive,
        cpuPreemptive,
        hasResults: true,
      };
    }

    const query = searchQuery.toLowerCase();
    const filtered = allAlgorithms.filter(
      (algorithm) =>
        algorithm.name.toLowerCase().includes(query) ||
        algorithm.abbr.toLowerCase().includes(query) ||
        algorithm.description.toLowerCase().includes(query)
    );

    return {
      disk: filtered.filter((alg) => alg.category === "disk"),
      cpuNonPreemptive: filtered.filter(
        (alg) => alg.category === "cpu-non-preemptive"
      ),
      cpuPreemptive: filtered.filter(
        (alg) => alg.category === "cpu-preemptive"
      ),
      hasResults: filtered.length > 0,
    };
  }, [searchQuery]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleVisualize = (algorithm: { abbr: string; category: string }) => {
    if (
      algorithm.abbr === "FCFS" &&
      algorithm.category === "cpu-non-preemptive"
    ) {
      router.push("/fcfs");
    }
    if (
      algorithm.abbr === "SJF" &&
      algorithm.category === "cpu-non-preemptive"
    ) {
      router.push("/sjf");
    }
    // Add other algorithm routes here in the future
  };

  return (
    <div className="min-h-screen transition-all duration-500 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="shadow-sm border-b transition-all duration-500 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold transition-colors duration-500 text-gray-900 dark:text-white">
                  AlgoFlow
                </h1>
                <p className="text-sm transition-colors duration-500 text-gray-600 dark:text-gray-300">
                  Visualizing scheduling algorithms through animation
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="transition-all duration-300 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-transparent"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 mr-2" />
                ) : (
                  <Moon className="w-4 h-4 mr-2" />
                )}
                {theme === "dark" ? "Light" : "Dark"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 transition-colors duration-500 text-gray-900 dark:text-white">
            Master Scheduling Algorithms
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto transition-colors duration-500 text-gray-600 dark:text-gray-300">
            Interactive visualizations for disk scheduling and CPU scheduling
            algorithms. Learn through animation and hands-on practice.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search algorithms..."
              className="pl-10 py-3 text-lg transition-all duration-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {searchQuery && !filteredAlgorithms.hasResults && (
          <div className="text-center mb-12">
            <p className="text-lg transition-colors duration-500 text-gray-600 dark:text-gray-400">
              No algorithms found for "{searchQuery}"
            </p>
          </div>
        )}

        {/* Disk Scheduling Algorithms */}
        {(!searchQuery || filteredAlgorithms.disk.length > 0) && (
          <section className="mb-16">
            <div className="flex items-center mb-8">
              <HardDrive className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-3xl font-bold transition-colors duration-500 text-gray-900 dark:text-white">
                Disk Scheduling Algorithms
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlgorithms.disk.map((algorithm, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:bg-gray-750"
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-full h-32 ${algorithm.color} rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform`}
                    >
                      <div className="text-center">
                        <div className="text-white text-2xl font-bold mb-2">
                          {algorithm.abbr}
                        </div>
                        <div className="w-16 h-1 bg-white/30 mx-auto"></div>
                      </div>
                    </div>
                    <h4 className="font-semibold mb-2 transition-colors duration-500 text-gray-900 dark:text-white">
                      {algorithm.name}
                    </h4>
                    <p className="text-sm transition-colors duration-500 text-gray-600 dark:text-gray-300">
                      {algorithm.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 w-full transition-all duration-300 bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => handleVisualize(algorithm)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Visualize
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* CPU Scheduling Algorithms */}
        {(!searchQuery ||
          filteredAlgorithms.cpuNonPreemptive.length > 0 ||
          filteredAlgorithms.cpuPreemptive.length > 0) && (
          <section>
            <div className="flex items-center mb-8">
              <Cpu className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-3xl font-bold transition-colors duration-500 text-gray-900 dark:text-white">
                CPU Scheduling Algorithms
              </h3>
            </div>

            {/* Non-Preemptive */}
            {(!searchQuery ||
              filteredAlgorithms.cpuNonPreemptive.length > 0) && (
              <div className="mb-12">
                <h4 className="text-xl font-semibold mb-6 transition-colors duration-500 text-gray-800 dark:text-gray-200">
                  Non-Preemptive
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAlgorithms.cpuNonPreemptive.map(
                    (algorithm, index) => (
                      <Card
                        key={index}
                        className="hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:bg-gray-750"
                      >
                        <CardContent className="p-6">
                          <div
                            className={`w-full h-32 ${algorithm.color} rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform`}
                          >
                            <div className="text-center">
                              <div className="text-white text-2xl font-bold mb-2">
                                {algorithm.abbr}
                              </div>
                              <div className="w-16 h-1 bg-white/30 mx-auto"></div>
                            </div>
                          </div>
                          <h5 className="font-semibold mb-2 transition-colors duration-500 text-gray-900 dark:text-white">
                            {algorithm.name}
                          </h5>
                          <p className="text-sm transition-colors duration-500 text-gray-600 dark:text-gray-300">
                            {algorithm.description}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4 w-full transition-all duration-300 bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            onClick={() => handleVisualize(algorithm)}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Visualize
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Preemptive */}
            {(!searchQuery || filteredAlgorithms.cpuPreemptive.length > 0) && (
              <div>
                <h4 className="text-xl font-semibold mb-6 transition-colors duration-500 text-gray-800 dark:text-gray-200">
                  Preemptive
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAlgorithms.cpuPreemptive.map((algorithm, index) => (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:bg-gray-750"
                    >
                      <CardContent className="p-6">
                        <div
                          className={`w-full h-32 ${algorithm.color} rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform`}
                        >
                          <div className="text-center">
                            <div className="text-white text-2xl font-bold mb-2">
                              {algorithm.abbr}
                            </div>
                            <div className="w-16 h-1 bg-white/30 mx-auto"></div>
                          </div>
                        </div>
                        <h5 className="font-semibold mb-2 transition-colors duration-500 text-gray-900 dark:text-white">
                          {algorithm.name}
                        </h5>
                        <p className="text-sm transition-colors duration-500 text-gray-600 dark:text-gray-300">
                          {algorithm.description}
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4 w-full transition-all duration-300 bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          onClick={() => handleVisualize(algorithm)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Visualize
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t mt-20 transition-all duration-500 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center transition-colors duration-500 text-gray-600 dark:text-gray-300">
            <p className="mb-2">
              AlgoFlow - Interactive Algorithm Visualization Platform
            </p>
            <p className="text-sm">
              Learn scheduling algorithms through hands-on visualization and
              practice
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
