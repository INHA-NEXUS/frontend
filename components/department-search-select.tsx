"use client"

import { useState, useMemo } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { departments, getDepartmentDisplay, type Department } from "@/lib/departments"

interface DepartmentSearchSelectProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
}

export function DepartmentSearchSelect({
  value,
  onValueChange,
  placeholder = "학과를 검색하세요",
}: DepartmentSearchSelectProps) {
  const [open, setOpen] = useState(false)

  const selectedDept = useMemo(() => {
    return departments.find((dept) => getDepartmentDisplay(dept) === value)
  }, [value])

  const groupedDepartments = useMemo(() => {
    const grouped: Record<string, Department[]> = {}
    departments.forEach((dept) => {
      if (!grouped[dept.college]) {
        grouped[dept.college] = []
      }
      grouped[dept.college].push(dept)
    })
    return grouped
  }, [])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-transparent"
        >
          {selectedDept ? (
            <span className="truncate">{getDepartmentDisplay(selectedDept)}</span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="학과명, 전공명 검색..." className="border-0 focus:ring-0" />
          <CommandList>
            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
            {Object.entries(groupedDepartments).map(([college, depts]) => (
              <CommandGroup key={college} heading={college}>
                {depts.map((dept) => {
                  const displayValue = getDepartmentDisplay(dept)
                  return (
                    <CommandItem
                      key={displayValue}
                      value={displayValue}
                      onSelect={(currentValue) => {
                        onValueChange(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check className={cn("mr-2 h-4 w-4", value === displayValue ? "opacity-100" : "opacity-0")} />
                      <div className="flex flex-col">
                        <span className="text-sm">{dept.name}</span>
                        <span className="text-xs text-muted-foreground">{dept.major}</span>
                      </div>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
